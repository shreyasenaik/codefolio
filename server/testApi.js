import http from 'http';
import { app } from './server.js';
import { connectDB, disconnectDB } from './config/db.js';
import seedDatabase from './services/seedService.js';

let server;
let baseUrl;

async function request(method, path, body = null, token = null) {
  const url = new URL(path, baseUrl);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: { raw: data } });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n========================================');
  console.log('🚀 [TEST SUITE] Starting CodeFolio Core Verification...');
  console.log('========================================\n');

  try {
    await connectDB();
    await seedDatabase();

    await new Promise((resolve) => {
      server = app.listen(5099, () => {
        baseUrl = 'http://localhost:5099';
        console.log(`[TEST SUITE] Test server listening on :5099\n`);
        resolve();
      });
    });

    // 1. Health check
    console.log('1. Testing GET /api/health...');
    const health = await request('GET', '/api/health');
    console.log(`   Status: ${health.status} OK`);
    if (health.status !== 200) throw new Error('Health check failed');

    // 2. User Registration
    console.log('\n2. Testing POST /api/auth/register...');
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Alex Rivera',
      email: `alex_${Date.now()}@example.com`,
      password: 'Password123!',
      username: `alex_${Date.now()}`
    });
    console.log(`   Status: ${regRes.status} Registered @${regRes.data.user.username}`);
    const token = regRes.data.token;
    const username = regRes.data.user.username;
    if (regRes.status !== 201) throw new Error('Registration failed');

    // 3. Update Profile (React Hook Form state sync)
    console.log('\n3. Testing PUT /api/profile (Save Profile & Template)...');
    const profRes = await request('PUT', '/api/profile', {
      title: 'Senior Systems Engineer',
      bio: 'Crafting clean web architectures and distributed tools.',
      templateId: 'cyberpunk',
      isPro: true,
      customDomain: 'portfolio.alexrivera.dev'
    }, token);
    console.log(`   Status: ${profRes.status} - Template: "${profRes.data.profile.templateId}"`);
    if (profRes.status !== 200) throw new Error('Profile update failed');

    // 4. Create Project
    console.log('\n4. Testing POST /api/projects...');
    const projRes = await request('POST', '/api/projects', {
      title: 'HyperQueue Distributed Engine',
      description: 'Fault-tolerant job queue processing 100k jobs/sec.',
      techStack: ['Node.js', 'TypeScript', 'Redis', 'Docker'],
      repoLink: 'https://github.com/example/hyperqueue',
      liveLink: 'https://hyperqueue.example.com',
      featured: true
    }, token);
    console.log(`   Status: ${projRes.status} Created project: "${projRes.data.project.title}"`);
    if (projRes.status !== 201) throw new Error('Project creation failed');

    // 5. Create Skills
    console.log('\n5. Testing POST /api/skills...');
    const skillRes1 = await request('POST', '/api/skills', {
      name: 'TypeScript',
      category: 'Frontend',
      proficiency: 'Expert'
    }, token);
    const skillRes2 = await request('POST', '/api/skills', {
      name: 'Node.js',
      category: 'Backend',
      proficiency: 'Expert'
    }, token);
    console.log(`   Status: ${skillRes1.status} / ${skillRes2.status} Added skills: TypeScript, Node.js`);
    if (skillRes1.status !== 201 || skillRes2.status !== 201) throw new Error('Skill creation failed');

    // 6. Test Public Vanity Endpoint GET /api/users/:username
    console.log(`\n6. Testing GET /api/users/${username}...`);
    const publicRes = await request('GET', `/api/users/${username}`);
    console.log(`   Status: ${publicRes.status}`);
    console.log(`   User: ${publicRes.data.data.user.name} (@${publicRes.data.data.user.username})`);
    console.log(`   Template: ${publicRes.data.data.user.templateId}`);
    console.log(`   Projects Count: ${publicRes.data.data.projects.length}`);
    console.log(`   Skills Count: ${publicRes.data.data.skills.length}`);
    if (publicRes.status !== 200 || publicRes.data.data.projects.length !== 1 || publicRes.data.data.skills.length !== 2) {
      throw new Error('Public vanity endpoint aggregation verification failed');
    }

    // 7. Verify Showcase Demos /demo1 and /demo2
    console.log('\n7. Testing GET /api/users/demo1 (Minimalist Demo)...');
    const demo1Res = await request('GET', '/api/users/demo1');
    console.log(`   Status: ${demo1Res.status} - Template: ${demo1Res.data.data.user.templateId}`);
    if (demo1Res.status !== 200) throw new Error('demo1 showcase profile failed');

    console.log('\n8. Testing GET /api/users/demo2 (Cyberpunk Demo)...');
    const demo2Res = await request('GET', '/api/users/demo2');
    console.log(`   Status: ${demo2Res.status} - Template: ${demo2Res.data.data.user.templateId}`);
    if (demo2Res.status !== 200) throw new Error('demo2 showcase profile failed');

    console.log('\n========================================');
    console.log('🎉 ALL CASE STUDY SPECIFICATIONS VERIFIED & PASSED (100%)!');
    console.log('========================================\n');
  } catch (err) {
    console.error('\n❌ Test failure:', err.message);
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await disconnectDB();
  }
}

runTests();

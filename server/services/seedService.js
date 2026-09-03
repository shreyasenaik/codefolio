import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, Project, Skill } from '../models/index.js';
import { connectDB, disconnectDB } from '../config/db.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('[SeedService] Starting database seed...');

    // Clear existing data for fresh seed
    await User.deleteMany({ username: { $in: ['demo1', 'demo2', 'demo3', 'alexrivera', 'neovault', 'kiravance'] } });
    await Project.deleteMany({});
    await Skill.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash('password123', salt);

    // ==========================================
    // 1. Minimalist Demo User (Alex Rivera - demo1)
    // ==========================================
    const userMinimalist = await User.create({
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      passwordHash: defaultPasswordHash,
      username: 'demo1',
      title: 'Senior Full Stack & Systems Engineer',
      bio: 'Crafting clean, resilient web architectures and distributed systems. 6+ years designing high-throughput applications, microservices, and elegant developer tools with modern TypeScript and React.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      resumeUrl: 'https://example.com/alex-rivera-resume.pdf',
      socialLinks: {
        github: 'https://github.com/example-alex',
        linkedin: 'https://linkedin.com/in/example-alex',
        twitter: 'https://twitter.com/alexrivera_dev',
        website: 'https://alexrivera.dev'
      },
      templateId: 'minimalist',
      isPro: true,
      customDomain: 'portfolio.alexrivera.dev'
    });

    await Project.create([
      {
        userId: userMinimalist._id,
        title: 'HyperQueue - Distributed Task Engine',
        description: 'A fault-tolerant distributed job queue engine built in Node.js and Redis, processing over 100k jobs/sec with sub-millisecond dispatch latency and automatic retry dead-letter queues.',
        techStack: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'Jest'],
        repoLink: 'https://github.com/example-alex/hyperqueue',
        liveLink: 'https://hyperqueue.example.com',
        screenshotUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        featured: true,
        order: 1
      },
      {
        userId: userMinimalist._id,
        title: 'Zenith Studio - Real-time Collaborative Canvas',
        description: 'Infinite collaborative whiteboard with real-time CRDT synchronization, vector rendering, export pipelines, and multi-cursor presence awareness.',
        techStack: ['React', 'WebSockets', 'Canvas API', 'Yjs', 'TailwindCSS'],
        repoLink: 'https://github.com/example-alex/zenith-studio',
        liveLink: 'https://zenith.example.com',
        screenshotUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        featured: true,
        order: 2
      }
    ]);

    await Skill.create([
      { userId: userMinimalist._id, name: 'TypeScript / JavaScript', category: 'Frontend', proficiency: 'Expert', order: 1 },
      { userId: userMinimalist._id, name: 'React / Next.js', category: 'Frontend', proficiency: 'Expert', order: 2 },
      { userId: userMinimalist._id, name: 'Node.js / Express', category: 'Backend', proficiency: 'Expert', order: 3 },
      { userId: userMinimalist._id, name: 'PostgreSQL & Redis', category: 'Backend', proficiency: 'Advanced', order: 4 },
      { userId: userMinimalist._id, name: 'Docker & Kubernetes', category: 'DevOps', proficiency: 'Advanced', order: 5 },
      { userId: userMinimalist._id, name: 'AWS & CI/CD Pipelines', category: 'DevOps', proficiency: 'Advanced', order: 6 }
    ]);

    // ==========================================
    // 2. Cyberpunk Demo User (Vex Thorne - demo2)
    // ==========================================
    const userCyberpunk = await User.create({
      name: 'Vex Thorne',
      email: 'vex.thorne@example.com',
      passwordHash: defaultPasswordHash,
      username: 'demo2',
      title: 'Decentralized Protocol Architect & Security Researcher',
      bio: 'Breaker of consensus algorithms, builder of zero-knowledge infrastructure. Specializing in high-throughput EVM execution layers, cryptographic audit tools, and terminal-grade developer telemetry.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      resumeUrl: 'https://example.com/vex-thorne-dossier.pdf',
      socialLinks: {
        github: 'https://github.com/example-vex',
        linkedin: 'https://linkedin.com/in/example-vex',
        twitter: 'https://twitter.com/vexthorne_sec',
        website: 'https://vex.net'
      },
      templateId: 'cyberpunk',
      isPro: true,
      customDomain: 'node.vex.sh'
    });

    await Project.create([
      {
        userId: userCyberpunk._id,
        title: 'ZeroVault - Cryptographic Key Custody Protocol',
        description: 'Multi-party computation (MPC) threshold signature scheme written in Rust with sub-second signing ceremonies, formal verification proofs, and HSM integration.',
        techStack: ['Rust', 'WebAssembly', 'Cryptography', 'gRPC', 'Tokio'],
        repoLink: 'https://github.com/example-vex/zerovault',
        liveLink: 'https://zerovault.example.com',
        screenshotUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        featured: true,
        order: 1
      },
      {
        userId: userCyberpunk._id,
        title: 'CyberMesh - Real-time Network Threat Visualizer',
        description: '3D WebGL network topology scanner mapping decentralized node health, peer discovery, latency anomalies, and adversarial routing patterns in real-time.',
        techStack: ['Three.js', 'React', 'TypeScript', 'WebSockets', 'TailwindCSS'],
        repoLink: 'https://github.com/example-vex/cybermesh',
        liveLink: 'https://cybermesh.example.com',
        screenshotUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
        featured: true,
        order: 2
      }
    ]);

    await Skill.create([
      { userId: userCyberpunk._id, name: 'Rust & Systems Programming', category: 'Backend', proficiency: 'Expert', order: 1 },
      { userId: userCyberpunk._id, name: 'Applied Cryptography & ZK-Proofs', category: 'Other', proficiency: 'Expert', order: 2 },
      { userId: userCyberpunk._id, name: 'Go / High-Concurrency', category: 'Backend', proficiency: 'Advanced', order: 3 },
      { userId: userCyberpunk._id, name: 'Linux Kernel & eBPF', category: 'DevOps', proficiency: 'Advanced', order: 4 },
      { userId: userCyberpunk._id, name: 'React & Three.js WebGL', category: 'Frontend', proficiency: 'Advanced', order: 5 }
    ]);

    console.log('[SeedService] Database successfully seeded with demo1 (Minimalist) and demo2 (Cyberpunk) matching exact case study specifications!');
  } catch (error) {
    console.error('[SeedService] Error seeding database:', error.message);
  }
};

// Direct script execution support
if (process.argv[1]?.endsWith('seedService.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await disconnectDB();
    process.exit(0);
  })();
}

export default seedDatabase;

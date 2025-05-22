import { writeFileSync } from 'fs';

const subjects = [
  'artificial intelligence', 'machine learning', 'web development', 'mobile apps', 
  'cloud computing', 'cybersecurity', 'data science', 'blockchain', 'DevOps',
  'software architecture', 'user experience', 'database design', 'API development',
  'microservices', 'containerization', 'serverless computing', 'edge computing',
  'quantum computing', 'augmented reality', 'virtual reality', 'IoT devices',
  'big data analytics', 'natural language processing', 'computer vision'
];

const technologies = [
  'JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'Swift', 'Kotlin',
  'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask',
  'Spring', 'Express', 'FastAPI', 'Docker', 'Kubernetes', 'AWS', 'Azure',
  'Google Cloud', 'TensorFlow', 'PyTorch', 'MongoDB', 'PostgreSQL', 'Redis',
  'Elasticsearch', 'GraphQL', 'REST', 'gRPC', 'Terraform', 'Jenkins', 'Git'
];

const actions = [
  'implementing', 'optimizing', 'debugging', 'designing', 'architecting',
  'scaling', 'refactoring', 'testing', 'deploying', 'monitoring', 'securing',
  'integrating', 'migrating', 'automating', 'building', 'developing'
];

const contexts = [
  'enterprise applications', 'startup environments', 'large-scale systems',
  'real-time applications', 'distributed systems', 'legacy systems',
  'modern web applications', 'mobile platforms', 'embedded systems',
  'high-performance computing', 'financial services', 'healthcare systems',
  'e-commerce platforms', 'social media applications', 'gaming platforms'
];

const challenges = [
  'performance bottlenecks', 'scalability issues', 'security vulnerabilities',
  'data consistency', 'network latency', 'memory management', 'error handling',
  'user authentication', 'data migration', 'system integration', 'load balancing',
  'fault tolerance', 'data privacy', 'compliance requirements', 'technical debt'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateDocument(id: number): { id: string; content: string } {
  const subject = getRandomElement(subjects);
  const tech1 = getRandomElement(technologies);
  const tech2 = getRandomElement(technologies);
  const tech3 = getRandomElement(technologies);
  const action = getRandomElement(actions);
  const context = getRandomElement(contexts);
  const challenge = getRandomElement(challenges);
  
  const templates = [
    `This article explores ${subject} by ${action} solutions with ${tech1} and ${tech2}. We discuss best practices for ${context} and address common ${challenge} encountered in production environments.`,
    
    `A comprehensive guide to ${action} ${subject} using ${tech1}, ${tech2}, and ${tech3}. Learn how to overcome ${challenge} and build robust ${context} that scale effectively.`,
    
    `Deep dive into ${subject} architecture patterns. This document covers ${action} strategies with ${tech1} and practical approaches for ${context}. Special focus on resolving ${challenge} in modern applications.`,
    
    `Case study: ${action} ${subject} for ${context}. Implementation details using ${tech1}, ${tech2}, and lessons learned from handling ${challenge} in production systems.`,
    
    `Technical overview of ${subject} implementation. Key topics include ${action} with ${tech1}, integration patterns for ${context}, and mitigation strategies for ${challenge}.`
  ];
  
  const content = getRandomElement(templates);
  
  return {
    id: `doc${id}`,
    content
  };
}

function generateDataset(count: number = 1000): void {
  const documents = [];
  
  for (let i = 1; i <= count; i++) {
    documents.push(generateDocument(i));
  }
  
  const output = `export const testDocuments = ${JSON.stringify(documents, null, 2)};`;
  
  writeFileSync('src/testData.ts', output);
  console.log(`Generated ${count} test documents in src/testData.ts`);
}

// Generate dataset when script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const count = parseInt(process.argv[2]) || 1000;
  generateDataset(count);
}
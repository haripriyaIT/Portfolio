import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Skill Item Definition ─────────────────────────────────────────────────── */

interface SkillItem {
  id: string;
  label: string;
  category: string;
  color: string;
  svg: React.ReactNode;
}

interface OrbitRing {
  id: string;
  name: string;
  radiusPx: number;
  speed: number;
  ringColor: string;
  glowColor: string;
  items: SkillItem[];
}

/* ─── All skills matching the resume ────────────────────────────────────────── */

const ORBIT_RINGS: OrbitRing[] = [
  {
    id: 'ring-1',
    name: 'Languages & Frontend',
    radiusPx: 155,
    speed: 24,
    ringColor: 'rgba(6, 182, 212, 0.35)',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    items: [
      {
        id: 'java',
        label: 'Java',
        category: 'Languages',
        color: '#F89820',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#F89820" d="M12 2c2 3-2 4-1 6 1 1.5 3 1 3 3 0 1.5-1.5 2.5-3.5 2.5S7 12.5 7 10c0-2 2-3 3-4 1-1 1-2.5 2-4z" />
            <path fill="#ED8B00" d="M6 16c1 1 3 1.5 6 1.5s5-.5 6-1.5c-.3 2-2.3 3-6 3s-5.7-1-6-3z" />
          </svg>
        ),
      },
      {
        id: 'python',
        label: 'Python',
        category: 'Languages',
        color: '#FFD43B',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#3776AB" d="M12 2C8 2 8.5 4 8.5 4v4h7v1H6.5S4 8.7 4 12s2.7 3 2.7 3H8v-2.5S7.8 10 12 10s4 2.5 4 2.5v4.7S16.3 19 15 19h-3c-1.3 0-4 .5-4 3v1h8.5s3.5.2 3.5-3.5V15s.5-3-4-3h-3.5" />
            <path fill="#FFD43B" d="M12 22c4 0 3.5-2 3.5-2v-4h-7v-1h9S20 15.3 20 12s-2.7-3-2.7-3H16v2.5S16.2 14 12 14s-4-2.5-4-2.5V6.8S7.7 5 9 5h3c1.3 0 4-.5 4-3V1H7.5S4 .8 4 4.5V9s-.5 3 4 3h3.5" />
            <circle cx="9.5" cy="5.5" r="1" fill="#fff" />
            <circle cx="14.5" cy="18.5" r="1" fill="#fff" />
          </svg>
        ),
      },
      {
        id: 'c',
        label: 'C',
        category: 'Languages',
        color: '#A8B9CC',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" fill="#A8B9CC" />
            <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0A1628">C</text>
          </svg>
        ),
      },
      {
        id: 'javascript',
        label: 'JavaScript',
        category: 'Languages',
        color: '#F7DF1E',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <rect width="24" height="24" rx="3" fill="#F7DF1E" />
            <path d="M5.8 18.2l1.7-1c.3.5.6.9 1.3.9.6 0 .9-.2.9-.7 0-.5-.3-.7-1-.9l-.4-.2c-1.2-.5-2-1.1-2-2.4 0-1.2.9-2.1 2.4-2.1 1.1 0 1.9.4 2.4 1.4l-1.6 1c-.3-.5-.5-.7-.9-.7-.4 0-.7.3-.7.6 0 .4.3.6 1 .9l.4.2c1.4.6 2.1 1.2 2.1 2.5 0 1.4-1.1 2.2-2.6 2.2-1.4 0-2.4-.7-3-1.7z" fill="#000" />
          </svg>
        ),
      },
      {
        id: 'react',
        label: 'React.js',
        category: 'Frontend',
        color: '#61DAFB',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#61DAFB">
            <circle cx="12" cy="12" r="2.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          </svg>
        ),
      },
      {
        id: 'html',
        label: 'HTML5',
        category: 'Frontend',
        color: '#E34F26',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#E34F26" d="M3 2l1.8 17.8L12 22l7.2-2.2L21 2H3zm14.8 6.4h-7.6l.3 2.8h7.1l-.7 7-4.9 1.4-4.9-1.4-.4-4h2.5l.2 2 2.6.7 2.6-.7.3-3.2H6.6l-.8-8.2h12.5l-.5 2.8z" />
          </svg>
        ),
      },
      {
        id: 'css',
        label: 'CSS3',
        category: 'Frontend',
        color: '#1572B6',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#1572B6" d="M3 2l1.8 17.8L12 22l7.2-2.2L21 2H3zm14.8 4.2H6.4l.3 2.8h10.8l-.8 7.8-4.7 1.3-4.7-1.3-.3-3.6h2.5l.2 1.8 2.3.6 2.3-.6.3-3H6.8l-.8-8.2h12.3l-.5 2.4z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'ring-2',
    name: 'Machine Learning & Libraries',
    radiusPx: 245,
    speed: 34,
    ringColor: 'rgba(236, 72, 153, 0.35)',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    items: [
      {
        id: 'tensorflow',
        label: 'TensorFlow',
        category: 'Known Libraries',
        color: '#FF6F00',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#FF6F00" d="M12 2L3 7v4l5-2.8V20l4 2V6l-4 2.2V6L12 4l4 2v2.2L12 6v16l4-2V8.2L21 11V7l-9-5z" />
          </svg>
        ),
      },
      {
        id: 'opencv',
        label: 'OpenCV',
        category: 'Known Libraries',
        color: '#5C3EE8',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle cx="12" cy="7" r="4.5" fill="none" stroke="#FF0000" strokeWidth="2.5" />
            <circle cx="7" cy="16" r="4.5" fill="none" stroke="#00FF00" strokeWidth="2.5" />
            <circle cx="17" cy="16" r="4.5" fill="none" stroke="#0000FF" strokeWidth="2.5" />
          </svg>
        ),
      },
      {
        id: 'scikit',
        label: 'Scikit-learn',
        category: 'Known Libraries',
        color: '#F7931E',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle cx="12" cy="12" r="8" fill="none" stroke="#F7931E" strokeWidth="2" />
            <path d="M8 15c2 2 5 2 8-1" fill="none" stroke="#F7931E" strokeWidth="2" />
          </svg>
        ),
      },
      {
        id: 'numpy',
        label: 'NumPy',
        category: 'Known Libraries',
        color: '#4D77CF',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M5 5h4l6 10V5h4v14h-4L9 9v10H5z" fill="#4D77CF" />
          </svg>
        ),
      },
      {
        id: 'pandas',
        label: 'Pandas',
        category: 'Known Libraries',
        color: '#150458',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#E70488">
            <rect x="5" y="4" width="3" height="16" rx="1" fill="#150458" />
            <rect x="10.5" y="8" width="3" height="12" rx="1" fill="#E70488" />
            <rect x="16" y="11" width="3" height="9" rx="1" fill="#FFD43B" />
          </svg>
        ),
      },
      {
        id: 'matplotlib',
        label: 'Matplotlib',
        category: 'Known Libraries',
        color: '#11557C',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M3 19h18M4 15l4-7 4 5 4-9 4 11" fill="none" stroke="#11557C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        id: 'ml-algorithms',
        label: 'ML Algorithms',
        category: 'Machine learning',
        color: '#F43F5E',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F43F5E" strokeWidth="2">
            <circle cx="6" cy="6" r="3" fill="#F43F5E" />
            <circle cx="18" cy="6" r="3" fill="#F43F5E" />
            <circle cx="12" cy="18" r="3" fill="#F43F5E" />
            <path d="M8 8l3 7M16 8l-3 7" stroke="#F43F5E" />
          </svg>
        ),
      },
      {
        id: 'deep-learning-cnn',
        label: 'Deep Learning (CNN)',
        category: 'Machine learning',
        color: '#8B5CF6',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#8B5CF6" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="8.5" y="14" width="7" height="7" rx="1" />
            <path d="M7 10l3 4M17 10l-3 4" strokeDasharray="2 2" />
          </svg>
        ),
      },
      {
        id: 'generative-ai',
        label: 'Generative AI (LLMs)',
        category: 'Machine learning',
        color: '#06B6D4',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#06B6D4">
            <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2zM19 16l1.2 2.8L23 20l-2.8 1.2L19 24l-1.2-2.8L15 20l2.8-1.2L19 16z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'ring-3',
    name: 'Databases & Developer Tools',
    radiusPx: 335,
    speed: 46,
    ringColor: 'rgba(139, 92, 246, 0.35)',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    items: [
      {
        id: 'mysql',
        label: 'MySQL',
        category: 'Databases',
        color: '#4479A1',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4479A1" />
            <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="none" stroke="#4479A1" strokeWidth="2" />
            <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" fill="none" stroke="#4479A1" strokeWidth="2" />
          </svg>
        ),
      },
      {
        id: 'mongodb',
        label: 'MongoDB',
        category: 'Databases',
        color: '#47A248',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#47A248" d="M12 2C12 2 7 7.5 7 13.5C7 17.6 10.1 21 12 22C13.9 21 17 17.6 17 13.5C17 7.5 12 2 12 2Z" />
          </svg>
        ),
      },
      {
        id: 'git',
        label: 'Git',
        category: 'Developer Tools',
        color: '#F05032',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#F05032" d="M21.6 10.4l-8-8a2.5 2.5 0 00-3.5 0L8.2 4.3l2.8 2.8a2.2 2.2 0 012.8 2.8l2.7 2.7a2.2 2.2 0 11-1.3 1.3l-2.6-2.6v5.8a2.2 2.2 0 11-1.8 0V11a2.2 2.2 0 01-1.2-1.9L7 6.2 2.4 10.8a2.5 2.5 0 000 3.5l8 8a2.5 2.5 0 003.5 0l7.7-7.7a2.5 2.5 0 000-3.5z" />
          </svg>
        ),
      },
      {
        id: 'github',
        label: 'GitHub',
        category: 'Developer Tools',
        color: '#FFFFFF',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFFFFF">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        ),
      },
      {
        id: 'postman',
        label: 'Postman',
        category: 'Developer Tools',
        color: '#FF6C37',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF6C37">
            <path d="M13.5 2c-.8 0-1.5.7-1.5 1.5 0 .2.04.4.1.6L7.6 7.5A2.5 2.5 0 006 7c-1.4 0-2.5 1.1-2.5 2.5S4.6 12 6 12c.7 0 1.3-.3 1.8-.7l4.5 4.5c-.2.4-.3.8-.3 1.2 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5c-.4 0-.8.1-1.2.3L8.8 10.3c.4-.5.7-1.1.7-1.8 0-.2-.04-.4-.1-.6l4.5-3.4c.5.3 1 .5 1.6.5 1.4 0 2.5-1.1 2.5-2.5S14.9 2 13.5 2z" />
          </svg>
        ),
      },
      {
        id: 'vscode',
        label: 'VS Code',
        category: 'Developer Tools',
        color: '#007ACC',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#007ACC">
            <path d="M17.5 2.5L7 11.5l-4-3.5L1 9.5l4 4.5-4 4.5 2 1.5 4-3.5 10.5 9 5-2.5V5l-5-2.5zM17 17l-6-5 6-5v10z" />
          </svg>
        ),
      },
      {
        id: 'figma',
        label: 'Figma',
        category: 'Developer Tools',
        color: '#F24E1E',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#0ACF83" d="M12 24a4 4 0 01-4-4v-4h4a4 4 0 010 8z" />
            <path fill="#A259FF" d="M8 12a4 4 0 014-4H8v4z" />
            <path fill="#F24E1E" d="M8 8a4 4 0 014-4H8v4z" />
            <path fill="#FF7262" d="M12 0h4a4 4 0 010 8h-4V0z" />
            <path fill="#1ABCFE" d="M16 8a4 4 0 010 8h-4V8h4z" />
          </svg>
        ),
      },
      {
        id: 'canva',
        label: 'Canva',
        category: 'Developer Tools',
        color: '#00C4CC',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" fill="#00C4CC" />
            <text x="12" y="16.5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff" fontStyle="italic">C</text>
          </svg>
        ),
      },
      {
        id: 'antigravity',
        label: 'Antigravity',
        category: 'Developer Tools',
        color: '#A855F7',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#A855F7" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v12M8 10l4-4 4 4" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'ring-4',
    name: 'CS Fundamentals',
    radiusPx: 415,
    speed: 58,
    ringColor: 'rgba(168, 85, 247, 0.35)',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    items: [
      {
        id: 'dsa',
        label: 'DSA',
        category: 'CS Fundamentals',
        color: '#8B5CF6',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#8B5CF6" strokeWidth="2">
            <circle cx="12" cy="5" r="2.5" fill="#8B5CF6" />
            <circle cx="6" cy="17" r="2.5" fill="#8B5CF6" />
            <circle cx="18" cy="17" r="2.5" fill="#8B5CF6" />
            <path d="M12 7.5L6 14.5M12 7.5l6 7" />
          </svg>
        ),
      },
      {
        id: 'oops',
        label: 'OOPS',
        category: 'CS Fundamentals',
        color: '#EC4899',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#EC4899" strokeWidth="2">
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" />
            <path d="M11 7.5h6v6" />
          </svg>
        ),
      },
      {
        id: 'dbms',
        label: 'DBMS',
        category: 'CS Fundamentals',
        color: '#06B6D4',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#06B6D4" strokeWidth="2">
            <ellipse cx="12" cy="6" rx="7" ry="2.5" />
            <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
            <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
          </svg>
        ),
      },
      {
        id: 'os',
        label: 'Operating Systems',
        category: 'CS Fundamentals',
        color: '#3B82F6',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#3B82F6" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        ),
      },
      {
        id: 'cn',
        label: 'Computer Networks',
        category: 'CS Fundamentals',
        color: '#10B981',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#10B981" strokeWidth="2">
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <rect x="3" y="17" width="6" height="4" rx="1" />
            <rect x="15" y="17" width="6" height="4" rx="1" />
            <path d="M12 7v5M6 17v-3h12v3M12 12v2" />
          </svg>
        ),
      },
      {
        id: 'jdbc',
        label: 'JDBC',
        category: 'CS Fundamentals',
        color: '#F59E0B',
        svg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F59E0B" strokeWidth="2">
            <path d="M12 2v6M9 5h6M7 11h10v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9zM10 15h4" />
          </svg>
        ),
      },
    ],
  },
];

/* ─── Category List matching the user's resume ────────────────────────────── */

const RESUME_CATEGORIES = [
  { name: 'Languages', count: '4 Skills', color: '#F7DF1E', ringId: 'ring-1' },
  { name: 'Frontend', count: '3 Skills', color: '#61DAFB', ringId: 'ring-1' },
  { name: 'Known Libraries', count: '6 Skills', color: '#FF6F00', ringId: 'ring-2' },
  { name: 'Machine learning', count: '3 Skills', color: '#06B6D4', ringId: 'ring-2' },
  { name: 'Databases', count: '2 Skills', color: '#4479A1', ringId: 'ring-3' },
  { name: 'Developer Tools', count: '7 Skills', color: '#F05032', ringId: 'ring-3' },
  { name: 'CS Fundamentals', count: '6 Skills', color: '#8B5CF6', ringId: 'ring-4' },
];

/* ─── Main Skills Component ─────────────────────────────────────────────────── */

const Skills = () => {
  const [hoveredRingId, setHoveredRingId] = useState<string | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter or highlight matching items
  const isItemActive = (item: SkillItem, ringId: string) => {
    if (hoveredItemId === item.id) return true;
    if (selectedCategory && item.category.toLowerCase() === selectedCategory.toLowerCase()) return true;
    if (hoveredRingId === ringId) return true;
    return false;
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.88)' }}>
      {/* Ambient glowing fields */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400">
              Skills
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 rounded-full mx-auto" />
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => { setSelectedCategory(null); setHoveredRingId(null); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:text-white hover:bg-violet-500/20'
            }`}
          >
            All Skills (31)
          </button>
          {RESUME_CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(isCatActive ? null : cat.name);
                  setHoveredRingId(isCatActive ? null : cat.ringId);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
                  isCatActive
                    ? 'text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]'
                    : 'bg-violet-500/10 border-violet-500/20 text-violet-300/80 hover:text-white hover:bg-violet-500/20'
                }`}
                style={{
                  borderColor: isCatActive ? cat.color : undefined,
                  background: isCatActive ? `${cat.color}25` : undefined,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Orbit Showcase Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Responsive Orbital Viewport Container */}
          <div className="w-full max-w-[880px] aspect-square flex items-center justify-center relative select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative flex-shrink-0 origin-center scale-[0.38] xs:scale-[0.48] sm:scale-[0.62] md:scale-[0.78] lg:scale-[0.92] xl:scale-100"
              style={{ width: 880, height: 880 }}
            >
              {/* Static Orbit Ring Tracks */}
              {ORBIT_RINGS.map((orbit) => {
                const isHovered = hoveredRingId === orbit.id;
                const diameter = orbit.radiusPx * 2;
                return (
                  <div
                    key={orbit.id + '-track'}
                    className="absolute rounded-full pointer-events-none transition-all duration-300"
                    style={{
                      width: diameter,
                      height: diameter,
                      top: '50%',
                      left: '50%',
                      marginTop: -orbit.radiusPx,
                      marginLeft: -orbit.radiusPx,
                      border: `1.5px dashed ${isHovered ? orbit.ringColor.replace('0.35', '0.9') : orbit.ringColor}`,
                      boxShadow: isHovered
                        ? `0 0 40px ${orbit.glowColor}, inset 0 0 25px ${orbit.glowColor}`
                        : `0 0 12px ${orbit.glowColor}`,
                    }}
                  />
                );
              })}

              {/* Central Glowing Quantum Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.95) 0%, rgba(6,182,212,0.7) 50%, rgba(5,11,24,0.9) 100%)',
                    boxShadow: '0 0 45px rgba(139,92,246,0.9), 0 0 90px rgba(6,182,212,0.4)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <span className="text-white text-xs font-mono font-black tracking-widest text-center leading-none">
                    AI
                  </span>
                  <span className="text-cyan-300 text-[10px] font-mono font-bold tracking-widest mt-0.5">
                    CORE
                  </span>
                </motion.div>
              </div>

              {/* 360-Degree Revolving Orbit Layers */}
              {ORBIT_RINGS.map((orbit) => {
                const isOrbitPaused = hoveredRingId === orbit.id;
                const diameter = orbit.radiusPx * 2;

                return (
                  <div
                    key={orbit.id + '-revolving-layer'}
                    className="absolute"
                    style={{
                      width: diameter,
                      height: diameter,
                      top: '50%',
                      left: '50%',
                      marginTop: -orbit.radiusPx,
                      marginLeft: -orbit.radiusPx,
                      borderRadius: '50%',
                      animation: `orbit-revolve ${orbit.speed}s linear infinite`,
                      animationPlayState: isOrbitPaused ? 'paused' : 'running',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Items distributed evenly along 360° circumference */}
                    {orbit.items.map((item, idx) => {
                      const totalItems = orbit.items.length;
                      const angleRad = (idx * 2 * Math.PI) / totalItems;
                      const x = orbit.radiusPx + orbit.radiusPx * Math.cos(angleRad);
                      const y = orbit.radiusPx + orbit.radiusPx * Math.sin(angleRad);
                      const isHighlighted = isItemActive(item, orbit.id);
                      const isDirectlyHovered = hoveredItemId === item.id;

                      return (
                        <div
                          key={item.id}
                          className="absolute pointer-events-auto cursor-pointer"
                          style={{
                            left: `${x}px`,
                            top: `${y}px`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          onMouseEnter={() => {
                            setHoveredRingId(orbit.id);
                            setHoveredItemId(item.id);
                          }}
                          onMouseLeave={() => {
                            setHoveredRingId(null);
                            setHoveredItemId(null);
                          }}
                        >
                          {/* Counter-rotation to keep icons upright */}
                          <div
                            style={{
                              animation: `orbit-revolve-counter ${orbit.speed}s linear infinite`,
                              animationPlayState: isOrbitPaused ? 'paused' : 'running',
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.25 }}
                              className="relative flex items-center justify-center w-11 h-11 rounded-full border-2 backdrop-blur-md transition-all duration-300"
                              style={{
                                background: `radial-gradient(circle at 35% 35%, ${item.color}33, rgba(10,22,40,0.95))`,
                                borderColor: isHighlighted ? item.color : `${item.color}77`,
                                boxShadow: isHighlighted
                                  ? `0 0 25px ${item.color}, 0 0 12px ${item.color}`
                                  : `0 0 10px ${item.color}33`,
                              }}
                            >
                              <div className="flex items-center justify-center pointer-events-none">
                                {item.svg}
                              </div>
                            </motion.div>

                            {/* Floating Tooltip */}
                            {isDirectlyHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold text-white z-50 pointer-events-none"
                                style={{
                                  background: `linear-gradient(135deg, ${item.color}33, rgba(10,22,40,0.98))`,
                                  border: `1.5px solid ${item.color}`,
                                  boxShadow: `0 0 20px ${item.color}66`,
                                }}
                              >
                                <p className="font-heading font-bold text-white text-xs">{item.label}</p>
                                <p className="text-[10px] text-violet-200/80 font-mono tracking-wide uppercase">{item.category}</p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Side Legend with 7 Resume Categories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <div className="p-4 rounded-2xl glass neon-border-violet">
              <h3 className="text-base font-heading font-bold text-text mb-1 flex items-center justify-between">
                <span>Technical Skills Overview</span>
                <span className="text-xs font-mono text-cyan-400">7 Domains</span>
              </h3>
              <p className="text-xs text-muted mb-4 font-mono">
                Click any category or hover orbit nodes to highlight
              </p>

              <div className="space-y-3">
                {RESUME_CATEGORIES.map((cat) => {
                  const isCatSelected = selectedCategory === cat.name;
                  // Gather all skills under this category
                  const allSkillsInCategory = ORBIT_RINGS.flatMap((r) => r.items).filter(
                    (i) => i.category.toLowerCase() === cat.name.toLowerCase()
                  );

                  return (
                    <div
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(isCatSelected ? null : cat.name);
                        setHoveredRingId(isCatSelected ? null : cat.ringId);
                      }}
                      onMouseEnter={() => setHoveredRingId(cat.ringId)}
                      onMouseLeave={() => setHoveredRingId(null)}
                      className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isCatSelected
                          ? 'bg-violet-500/20 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                          : 'bg-surface/60 border-violet-500/20 hover:border-violet-400/50 hover:bg-violet-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                          />
                          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-text">
                            {cat.name}
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono text-violet-300/70">
                          {cat.count}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {allSkillsInCategory.map((item) => (
                          <span
                            key={item.id}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium text-white/80 border"
                            style={{
                              background: hoveredItemId === item.id || isCatSelected ? `${item.color}33` : `${item.color}15`,
                              borderColor: hoveredItemId === item.id || isCatSelected ? item.color : `${item.color}40`,
                            }}
                          >
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20 text-center">
              <p className="text-xs text-violet-300/70 font-mono">
                ✦ 31 skills distributed across 4 full-revolving quantum orbit tracks
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;

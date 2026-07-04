import React from 'react';
import { motion } from 'framer-motion';

interface ProjectIllustrationProps {
  title: string;
}

export const ProjectIllustration: React.FC<ProjectIllustrationProps> = ({ title }) => {
  const key = title.toLowerCase();

  const pulseTransition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  };

  // Base backdrop color
  const bgColor = "#FAF7F2";
  const accentGold = "#C17D4A";
  const accentDark = "#8B5E3C";
  const borderCol = "rgba(193, 125, 74, 0.15)";

  if (key.includes('orchestrator')) {
    // Multi-Agent system
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        {/* Animated flow path */}
        <motion.path
          d="M 90,96 L 190,46 L 290,96 L 190,146 Z"
          fill="none"
          stroke={accentGold}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Central hub validation node */}
        <line x1="190" y1="46" x2="190" y2="146" stroke="rgba(44, 40, 37, 0.1)" strokeWidth="1" />
        <line x1="90" y1="96" x2="290" y2="96" stroke="rgba(44, 40, 37, 0.1)" strokeWidth="1" />

        {/* Planning Agent */}
        <g transform="translate(90, 96)">
          <circle r="14" fill="white" stroke={accentDark} strokeWidth="1.5" className="shadow-sm" />
          <circle r="4" fill={accentDark} />
          <text x="0" y="24" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold">PLANNING</text>
        </g>

        {/* Coding Agent */}
        <g transform="translate(190, 46)">
          <circle r="14" fill="white" stroke={accentGold} strokeWidth="1.5" />
          <circle r="4" fill={accentGold} />
          <text x="0" y="-18" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold">CODING</text>
        </g>

        {/* Testing Agent */}
        <g transform="translate(290, 96)">
          <circle r="14" fill="white" stroke={accentDark} strokeWidth="1.5" />
          <circle r="4" fill={accentDark} />
          <text x="0" y="24" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold">TESTING</text>
        </g>

        {/* HITL Validation */}
        <g transform="translate(190, 146)">
          <circle r="14" fill="white" stroke={accentGold} strokeWidth="1.5" />
          <motion.circle r="7" fill={accentGold} fillOpacity="0.25" animate={{ scale: [1, 1.35, 1] }} transition={pulseTransition} />
          <circle r="3" fill={accentGold} />
          <text x="0" y="24" textAnchor="middle" className="font-mono text-[7px] fill-[#C17D4A] font-bold">HUMAN_HITL</text>
        </g>
      </svg>
    );
  }

  if (key.includes('debate')) {
    // Cooperative Multi-Agent Debate
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Dynamic connection arcs */}
        <motion.path
          d="M 100,96 Q 190,40 280,96"
          fill="none"
          stroke={accentGold}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 100,96 Q 190,152 280,96"
          fill="none"
          stroke={accentDark}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, 15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Agent A */}
        <g transform="translate(100, 96)">
          <circle r="18" fill="white" stroke={accentGold} strokeWidth="2" />
          <text x="0" y="3" textAnchor="middle" className="font-mono text-[8px] fill-[#C17D4A] font-bold">LLM_A</text>
        </g>

        {/* Agent B */}
        <g transform="translate(280, 96)">
          <circle r="18" fill="white" stroke={accentDark} strokeWidth="2" />
          <text x="0" y="3" textAnchor="middle" className="font-mono text-[8px] fill-[#8B5E3C] font-bold">LLM_B</text>
        </g>

        {/* Central Consensus Target */}
        <g transform="translate(190, 96)">
          <circle r="12" fill="white" stroke="rgba(44, 40, 37, 0.15)" strokeWidth="1" />
          <motion.circle r="8" fill={accentGold} fillOpacity="0.15" animate={{ scale: [1, 1.4, 1] }} transition={pulseTransition} />
          <circle r="3.5" fill={accentGold} />
          <text x="0" y="-18" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold tracking-wider">CONSENSUS</text>
        </g>
      </svg>
    );
  }

  if (key.includes('yolodetector')) {
    // Android Live Detector viewfinder
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Frame Brackets */}
        <g stroke={accentDark} strokeWidth="1.5" fill="none">
          <path d="M 30,30 L 30,20 L 40,20" />
          <path d="M 350,30 L 350,20 L 340,20" />
          <path d="M 30,162 L 30,172 L 40,172" />
          <path d="M 350,162 L 350,172 L 340,172" />
        </g>

        {/* Active scan line */}
        <motion.line
          x1="30"
          y1="96"
          x2="350"
          y2="96"
          stroke={accentGold}
          strokeWidth="1.5"
          animate={{ y1: [30, 162, 30], y2: [30, 162, 30] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Target Bounding Box */}
        <g transform="translate(130, 50)">
          <rect width="120" height="90" fill="none" stroke={accentGold} strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="-1" y="-14" width="70" height="14" fill={accentGold} />
          <text x="5" y="-4" className="font-mono text-[8px] fill-white font-bold">PERSON · 99%</text>
          
          {/* Keypoints */}
          <circle cx="60" cy="30" r="3" fill={accentDark} />
          <circle cx="45" cy="50" r="3" fill={accentDark} />
          <circle cx="75" cy="50" r="3" fill={accentDark} />
        </g>
      </svg>
    );
  }

  if (key.includes('trainer')) {
    // Neural Network training monitor
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Grid System */}
        <g stroke="rgba(44, 40, 37, 0.05)" strokeWidth="1">
          <line x1="50" y1="30" x2="330" y2="30" />
          <line x1="50" y1="70" x2="330" y2="70" />
          <line x1="50" y1="110" x2="330" y2="110" />
          <line x1="50" y1="150" x2="330" y2="150" />
          
          <line x1="50" y1="30" x2="50" y2="150" />
          <line x1="120" y1="30" x2="120" y2="150" />
          <line x1="190" y1="30" x2="190" y2="150" />
          <line x1="260" y1="30" x2="260" y2="150" />
          <line x1="330" y1="30" x2="330" y2="150" />
        </g>

        {/* Loss Curve path */}
        <motion.path
          d="M 50,40 Q 120,130 190,140 T 330,148"
          fill="none"
          stroke={accentGold}
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />

        {/* Current Loss marker */}
        <g transform="translate(190, 140)">
          <circle r="4" fill={accentDark} />
          <circle r="8" fill={accentDark} fillOpacity="0.25" className="animate-ping" />
          <text x="10" y="-8" className="font-mono text-[7px] fill-[#7A6E65] font-bold">LOSS: 0.012</text>
        </g>

        <text x="50" y="165" className="font-mono text-[7px] fill-[#A89E94]">EPOCH 0</text>
        <text x="310" y="165" className="font-mono text-[7px] fill-[#A89E94]">EPOCH 100</text>
      </svg>
    );
  }

  if (key.includes('moodify')) {
    // Audio / Emotional Wave illustration
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Multiplying wavy lines */}
        <motion.path
          d="M 40,96 C 100,20 120,172 190,96 C 260,20 280,172 340,96"
          fill="none"
          stroke={accentGold}
          strokeWidth="1.5"
          animate={{ d: [
            "M 40,96 C 100,20 120,172 190,96 C 260,20 280,172 340,96",
            "M 40,96 C 100,172 120,20 190,96 C 260,172 280,20 340,96",
            "M 40,96 C 100,20 120,172 190,96 C 260,20 280,172 340,96"
          ]}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 40,96 C 80,140 140,40 190,96 C 240,152 300,40 340,96"
          fill="none"
          stroke={accentDark}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          animate={{ d: [
            "M 40,96 C 80,140 140,40 190,96 C 240,152 300,40 340,96",
            "M 40,96 C 80,40 140,140 190,96 C 240,40 300,140 340,96",
            "M 40,96 C 80,140 140,40 190,96 C 240,152 300,40 340,96"
          ]}}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Central Audio Vector Node */}
        <g transform="translate(190, 96)">
          <circle r="12" fill="white" stroke={accentGold} strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" className="font-mono text-[7px] fill-[#C17D4A] font-bold">EMO_AI</text>
        </g>
      </svg>
    );
  }

  if (key.includes('papermind')) {
    // RAG Document vector search illustration
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Document box left */}
        <g transform="translate(60, 46)">
          <rect width="80" height="100" rx="4" fill="white" stroke="rgba(44, 40, 37, 0.12)" strokeWidth="1.5" />
          <line x1="12" y1="20" x2="68" y2="20" stroke="rgba(44, 40, 37, 0.15)" strokeWidth="2" />
          <line x1="12" y1="35" x2="68" y2="35" stroke="rgba(44, 40, 37, 0.08)" strokeWidth="1.5" />
          <line x1="12" y1="50" x2="52" y2="50" stroke="rgba(44, 40, 37, 0.08)" strokeWidth="1.5" />
          <line x1="12" y1="65" x2="60" y2="65" stroke="rgba(44, 40, 37, 0.08)" strokeWidth="1.5" />
          <line x1="12" y1="80" x2="40" y2="80" stroke="rgba(44, 40, 37, 0.08)" strokeWidth="1.5" />
        </g>

        {/* Vector query arrow pointing to paper */}
        <g transform="translate(180, 96)">
          <motion.line
            x1="-20"
            y1="0"
            x2="35"
            y2="0"
            stroke={accentGold}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            animate={{ strokeDashoffset: [0, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="35" cy="0" r="3.5" fill={accentGold} />
          <text x="8" y="-12" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold">RAG_QUERY</text>
        </g>

        {/* Output context chat bubble */}
        <g transform="translate(240, 66)">
          <rect width="80" height="60" rx="8" fill="white" stroke={accentDark} strokeWidth="1.5" />
          <line x1="12" y1="18" x2="68" y2="18" stroke={accentDark} strokeWidth="1.5" />
          <line x1="12" y1="32" x2="52" y2="32" stroke={accentDark} strokeWidth="1.5" />
          <text x="40" y="48" textAnchor="middle" className="font-mono text-[7px] fill-[#8B5E3C] font-bold">LLM_RESPONSE</text>
        </g>
      </svg>
    );
  }

  if (key.includes('assistant')) {
    // Sound wave listener circle
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Concentric voice waves */}
        <g transform="translate(190, 96)">
          <motion.circle
            r="45"
            fill="none"
            stroke={accentGold}
            strokeWidth="1"
            strokeDasharray="5 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="30"
            fill="none"
            stroke={accentDark}
            strokeWidth="1.5"
            animate={{ scale: [0.95, 1.15, 0.95] }}
            transition={pulseTransition}
          />
          <circle r="15" fill={accentGold} fillOpacity="0.15" />
          <circle r="6" fill={accentGold} />
          
          <text x="0" y="65" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold tracking-widest">TINY_LLAMA_ACTIVE</text>
        </g>
      </svg>
    );
  }

  if (key.includes('password')) {
    // Secure Key vault
    return (
      <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
        <rect width="380" height="192" fill={bgColor} />
        
        {/* Secure shield block layout */}
        <g transform="translate(190, 85)">
          {/* Outer ring */}
          <motion.circle
            r="45"
            fill="none"
            stroke={accentGold}
            strokeWidth="1.2"
            strokeDasharray="8 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Keyhole / shield vector representation */}
          <path
            d="M -15,-20 L 15,-20 L 15,0 C 15,15 0,25 0,25 C 0,25 -15,15 -15,0 Z"
            fill="white"
            stroke={accentDark}
            strokeWidth="2"
          />
          <circle cx="0" cy="-2" r="4" fill={accentDark} />
          <line x1="0" y1="2" x2="0" y2="10" stroke={accentDark} strokeWidth="2.5" />
          
          <text x="0" y="60" textAnchor="middle" className="font-mono text-[7px] fill-[#7A6E65] font-bold">SECURE_VAULT_AES256</text>
        </g>
      </svg>
    );
  }

  // Default Generic vector placeholder
  return (
    <svg viewBox="0 0 380 192" className="w-full h-full bg-[#FAF7F2]">
      <rect width="380" height="192" fill={bgColor} />
      <g transform="translate(190, 96)">
        <circle r="40" fill="none" stroke={borderCol} strokeWidth="1" strokeDasharray="3 3" />
        <circle r="25" fill="none" stroke={accentGold} strokeWidth="1.5" />
        <circle r="6" fill={accentDark} />
        <text x="0" y="60" textAnchor="middle" className="font-mono text-[7px] fill-[#A89E94] font-semibold uppercase tracking-wider">{title}</text>
      </g>
    </svg>
  );
};

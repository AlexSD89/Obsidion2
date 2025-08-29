"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Palette, Sparkles, Layers, Wand2, Brush, Zap } from "lucide-react"

export function ConsultantDesigner() {
  const [knowledgeModules, setKnowledgeModules] = useState([
    { name: "创意洞察", icon: Sparkles, progress: 95, color: "from-green-400 to-emerald-500" },
    { name: "设计系统", icon: Layers, progress: 88, color: "from-emerald-400 to-teal-500" },
    { name: "用户体验", icon: Wand2, progress: 92, color: "from-teal-400 to-cyan-500" },
    { name: "创新方案", icon: Zap, progress: 97, color: "from-cyan-400 to-green-500" }
  ])

  const [activeKnowledge, setActiveKnowledge] = useState(0)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])

  useEffect(() => {
    // 生成创意粒子
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 180 + 20,
      y: Math.random() * 180 + 20,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKnowledge((prev) => (prev + 1) % knowledgeModules.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [knowledgeModules.length])

  return (
    <div className="relative flex items-center justify-center">
      {/* Glass Morphism背景 */}
      <motion.div
        className="relative w-48 h-48 backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-full border border-white/20"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(34,197,94,0.3)",
            "0 0 40px rgba(20,184,166,0.4)", 
            "0 0 20px rgba(34,197,94,0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* 中心头像 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5, repeat: Infinity }
          }}
        >
          <Palette className="w-8 h-8 text-white" />
        </motion.div>

        {/* 创意画笔效果 */}
        <motion.div
          className="absolute top-4 right-4 w-6 h-6"
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Brush className="w-6 h-6 text-green-400" />
        </motion.div>

        {/* 知识模块 */}
        {knowledgeModules.map((module, index) => {
          const angle = (index * 90) - 90 // 每个模块间隔90度
          const radius = 82
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius
          const IconComponent = module.icon
          
          return (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
              }}
              animate={{
                scale: activeKnowledge === index ? 1.25 : 1,
                rotate: [0, 360]
              }}
              transition={{
                scale: { duration: 0.3 },
                rotate: { duration: 9, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className={`
                w-11 h-11 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center relative
                ${activeKnowledge === index 
                  ? `bg-gradient-to-br ${module.color} border-2 border-white shadow-xl` 
                  : 'bg-white/15 border border-white/25'
                }
              `}>
                <IconComponent className={`w-4 h-4 ${activeKnowledge === index ? 'text-white' : 'text-green-400'}`} />
                
                {/* 创意指标 */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                  <div className={`w-6 h-1 rounded-full ${activeKnowledge === index ? 'bg-white/80' : 'bg-green-400/50'}`}>
                    <motion.div
                      className="h-full rounded-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: activeKnowledge === index ? `${module.progress}%` : "60%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* 创意粒子效果 */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -20, -40]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut"
            }}
          />
        ))}

        {/* 设计创新指标 */}
        <motion.div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-center">
            <p className="text-xs text-green-400 font-bold">
              {knowledgeModules[activeKnowledge].name}: {knowledgeModules[activeKnowledge].progress}%
            </p>
            <p className="text-xs text-gray-300">创意引擎运行中</p>
          </div>
        </motion.div>

        {/* 创意光环 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="creativityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34,197,94,0.8)" />
                <stop offset="50%" stopColor="rgba(20,184,166,0.8)" />
                <stop offset="100%" stopColor="rgba(6,182,212,0.8)" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#creativityGradient)"
              strokeWidth="2"
              strokeDasharray="10 5"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* 脉冲效果 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 border border-green-400/30 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.1, 0.4]
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 border border-teal-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.05, 0.3]
          }}
          transition={{ duration: 3.2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}
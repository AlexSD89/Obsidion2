"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Target, Briefcase, Users, Zap, Lightbulb, TrendingUp } from "lucide-react"

export function CeoStrategist() {
  const [strategyModules, setStrategyModules] = useState([
    { name: "市场分析", icon: TrendingUp, status: "active", color: "from-red-500 to-orange-600" },
    { name: "团队优化", icon: Users, status: "processing", color: "from-orange-500 to-yellow-600" }, 
    { name: "创新驱动", icon: Lightbulb, status: "standby", color: "from-yellow-500 to-red-500" },
    { name: "执行策略", icon: Zap, status: "completed", color: "from-red-600 to-pink-600" }
  ])

  const [activeModule, setActiveModule] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % strategyModules.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [strategyModules.length])

  return (
    <div className="relative flex items-center justify-center">
      {/* Glass Morphism背景 */}
      <motion.div
        className="relative w-48 h-48 backdrop-blur-sm bg-gradient-to-br from-red-500/10 to-orange-600/10 rounded-full border border-white/20"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(239,68,68,0.3)",
            "0 0 40px rgba(251,146,60,0.4)", 
            "0 0 20px rgba(239,68,68,0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* 中心头像 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          <Target className="w-8 h-8 text-white" />
        </motion.div>

        {/* 全息投影板效果 */}
        <motion.div
          className="absolute top-8 left-1/2 w-16 h-1 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          animate={{ 
            scaleX: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* 战略模块轮播 */}
        {strategyModules.map((module, index) => {
          const angle = (index * 90) - 90 // 每个模块间隔90度
          const radius = 85
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
                scale: activeModule === index ? 1.3 : 1,
                rotate: [0, 360]
              }}
              transition={{
                scale: { duration: 0.4 },
                rotate: { duration: 12, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className={`
                w-12 h-12 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center
                ${activeModule === index 
                  ? `bg-gradient-to-br ${module.color} border-2 border-white shadow-lg` 
                  : 'bg-white/10 border border-white/20'
                }
              `}>
                <IconComponent className={`w-4 h-4 ${activeModule === index ? 'text-white' : 'text-red-400'}`} />
                <div className={`w-2 h-2 mt-1 rounded-full ${
                  module.status === 'active' ? 'bg-green-400 animate-pulse' :
                  module.status === 'processing' ? 'bg-yellow-400 animate-spin' :
                  module.status === 'completed' ? 'bg-blue-400' : 'bg-gray-400'
                }`} />
              </div>
            </motion.div>
          )
        })}

        {/* 企业转型指标 */}
        <motion.div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-center">
            <p className="text-xs text-orange-400 font-bold">
              {strategyModules[activeModule].name}
            </p>
            <p className="text-xs text-gray-300">战略模块运行中</p>
          </div>
        </motion.div>

        {/* 执行进度环 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50" 
              r="45"
              fill="none"
              stroke="rgba(239,68,68,0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(251,146,60,0.8)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(activeModule + 1) * 70} 283`}
              initial={{ strokeDasharray: "0 283" }}
              animate={{ strokeDasharray: `${(activeModule + 1) * 70} 283` }}
              transition={{ duration: 0.8 }}
            />
          </svg>
        </motion.div>

        {/* 脉冲效果 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-red-400/30 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 border border-orange-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.05, 0.2]
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}
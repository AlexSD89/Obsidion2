"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, PieChart, BarChart3 } from "lucide-react"

export function InvestorAnalyst() {
  const [dataPoints, setDataPoints] = useState([
    { label: "ROI", value: "127%", trend: "up" },
    { label: "Risk", value: "Low", trend: "stable" },
    { label: "Growth", value: "34.2%", trend: "up" },
    { label: "Score", value: "9.4/10", trend: "up" }
  ])

  const [currentPoint, setCurrentPoint] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoint((prev) => (prev + 1) % dataPoints.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [dataPoints.length])

  return (
    <div className="relative flex items-center justify-center">
      {/* Glass Morphism背景 */}
      <motion.div
        className="relative w-48 h-48 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full border border-white/20"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(59,130,246,0.3)",
            "0 0 40px rgba(139,92,246,0.4)", 
            "0 0 20px rgba(59,130,246,0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* 中心头像 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <TrendingUp className="w-8 h-8 text-white" />
        </motion.div>

        {/* 智能眼镜效果 */}
        <motion.div
          className="absolute top-14 left-1/2 w-12 h-6 -translate-x-1/2 border-2 border-blue-400 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* 旋转数据点 */}
        {dataPoints.map((point, index) => {
          const angle = (index * 90) - 90 // 每个点间隔90度
          const radius = 80
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius
          
          return (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
              }}
              animate={{
                scale: currentPoint === index ? 1.2 : 1,
                rotate: [0, 360]
              }}
              transition={{
                scale: { duration: 0.3 },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className={`
                w-12 h-12 rounded-lg backdrop-blur-sm flex flex-col items-center justify-center
                ${currentPoint === index 
                  ? 'bg-blue-500/30 border-2 border-blue-400' 
                  : 'bg-white/10 border border-white/20'
                }
              `}>
                <div className="w-4 h-4 mb-1">
                  {index === 0 && <DollarSign className="w-4 h-4 text-green-400" />}
                  {index === 1 && <PieChart className="w-4 h-4 text-yellow-400" />}
                  {index === 2 && <BarChart3 className="w-4 h-4 text-blue-400" />}
                  {index === 3 && <TrendingUp className="w-4 h-4 text-purple-400" />}
                </div>
                <span className="text-xs text-white font-bold">{point.value}</span>
              </div>
            </motion.div>
          )
        })}

        {/* 实时指标显示 */}
        <motion.div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-center">
            <p className="text-xs text-green-400 font-bold">
              {dataPoints[currentPoint].label}: {dataPoints[currentPoint].value}
            </p>
            <p className="text-xs text-gray-300">实时投资分析</p>
          </div>
        </motion.div>

        {/* 脉冲效果 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-blue-400/30 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 border border-purple-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.05, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}
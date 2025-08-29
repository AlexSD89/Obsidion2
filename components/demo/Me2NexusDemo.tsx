"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InvestorAnalyst } from "@/components/avatars/InvestorAnalyst"
import { CeoStrategist } from "@/components/avatars/CeoStrategist"  
import { ConsultantDesigner } from "@/components/avatars/ConsultantDesigner"

const identities = [
  { 
    id: 'investor', 
    name: '投资分析师', 
    emoji: '📊',
    color: 'from-blue-600 to-purple-700',
    borderColor: 'border-blue-400',
    component: InvestorAnalyst
  },
  { 
    id: 'ceo', 
    name: 'CEO战略家', 
    emoji: '👑',
    color: 'from-red-600 to-orange-700',
    borderColor: 'border-red-400',
    component: CeoStrategist
  },
  { 
    id: 'consultant', 
    name: '顾问设计师', 
    emoji: '🎨',
    color: 'from-green-600 to-emerald-700',
    borderColor: 'border-green-400',
    component: ConsultantDesigner
  }
]

export default function Me2NexusDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([])

  useEffect(() => {
    // 生成星空背景
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % identities.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const currentIdentity = identities[currentIndex]
  const CurrentComponent = currentIdentity.component

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* 星空背景效果 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          />
        ))}
      </div>

      {/* 主内容区域 */}
      <main className="relative z-10">
        {/* 标题区域 */}
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
            Me² NEXUS
          </h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            下一代AI智能协作平台，汇聚专业投资分析、战略规划与创意设计能力，
            为您的业务决策提供全方位智能支持
          </motion.p>
        </motion.div>

        {/* AI头像展示区域 */}
        <div className="relative">
          {/* 连接线动画 */}
          <motion.div 
            className="flex items-center justify-center space-x-8 py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                className="w-64 h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </div>

            {/* 三个AI头像 */}
            {identities.map((identity, index) => (
              <motion.div
                key={identity.id}
                initial={{ 
                  opacity: 0, 
                  x: index === 0 ? -100 : index === 1 ? 0 : 100,
                  y: index === 1 ? -100 : 0
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + index * 0.2 
                }}
              >
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setCurrentIndex(index)}
                  tabIndex={0}
                >
                  {/* 外发光效果 */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${identity.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* 主头像 */}
                  <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${identity.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white text-2xl font-bold">{identity.emoji}</div>
                    <div className={`absolute inset-0 rounded-full border-2 ${identity.borderColor} ${currentIndex === index ? 'animate-pulse' : ''}`}></div>
                  </div>

                  {/* 角色标签 */}
                  <motion.div 
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.2 }}
                  >
                    <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                      {identity.name}
                    </div>
                  </motion.div>

                  {/* 活跃状态指示器 */}
                  {currentIndex === index && (
                    <motion.div 
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  )}

                  {/* 装饰效果（仅CEO） */}
                  {identity.id === 'ceo' && (
                    <div className={`absolute inset-0 rounded-full border-2 ${identity.borderColor}`} 
                         style={{clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'}}></div>
                  )}
                  
                  {/* 格子背景（仅顾问设计师） */}
                  {identity.id === 'consultant' && (
                    <div className="absolute inset-2 rounded-full border border-green-300/30" 
                         style={{
                           backgroundImage: `linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                            linear-gradient(0deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
                           backgroundSize: '8px 8px'
                         }}></div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* 全局光效 */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            >
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full"></div>
            </motion.div>
          </motion.div>

          {/* AI头像详细展示区域 */}
          <motion.div 
            className="mt-16 px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
              >
                <div className="flex justify-center mb-6">
                  <div className="transform scale-90">
                    <CurrentComponent />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {currentIdentity.name}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    正在为{currentIdentity.name}展示AI协作能力
                  </p>
                  <div className="flex justify-center gap-2">
                    {identities.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 底部提示 */}
        <motion.div 
          className="text-center py-20 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <p className="text-gray-400 max-w-lg mx-auto">
            点击任意AI头像了解更多详情，开启您的智能协作之旅
          </p>
        </motion.div>
      </main>
    </section>
  )
}
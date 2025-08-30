"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Brain, TrendingUp, BarChart3, FileText, CheckCircle, Clock, ArrowRight } from "lucide-react"

// 模拟的Agent角色
const agents = [
  {
    id: 'investor',
    name: '投资分析师',
    color: 'from-blue-500 to-blue-600',
    icon: TrendingUp,
    tasks: ['市场研究', '风险评估', 'ROI分析', '投资建议']
  },
  {
    id: 'strategist', 
    name: 'CEO战略家',
    color: 'from-purple-500 to-purple-600',
    icon: Brain,
    tasks: ['战略规划', '商业模式', '竞争分析', '决策制定']
  },
  {
    id: 'analyst',
    name: '数据分析师', 
    color: 'from-green-500 to-green-600',
    icon: BarChart3,
    tasks: ['数据挖掘', '趋势分析', '报告生成', '可视化']
  }
]

const sampleQueries = [
  "帮我分析一下电动汽车行业的投资机会",
  "制定一个新产品的市场进入策略",
  "评估我们公司的数字化转型方案",
  "分析竞争对手的商业模式优劣势"
]

interface AgentActivity {
  agentId: string
  task: string
  status: 'thinking' | 'working' | 'completed'
  result?: string
  progress: number
}

export default function DynamicAgentDashboard() {
  const [userInput, setUserInput] = useState('')
  const [currentQuery, setCurrentQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([])
  const [step, setStep] = useState(0) // 0: 待输入, 1: 处理中, 2: 完成
  const [autoDemo, setAutoDemo] = useState(true)
  const [demoIndex, setDemoIndex] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // 自动演示逻辑
  useEffect(() => {
    if (!autoDemo) return
    
    const interval = setInterval(() => {
      const query = sampleQueries[demoIndex]
      setCurrentQuery(query)
      simulateAgentWork(query)
      setDemoIndex((prev) => (prev + 1) % sampleQueries.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [autoDemo, demoIndex])

  // 智能打字效果 - 模拟真实打字节奏
  useEffect(() => {
    if (!currentQuery || !autoDemo) return
    
    setUserInput('')
    let index = 0
    
    const typeNextCharacter = () => {
      if (index < currentQuery.length) {
        const char = currentQuery[index]
        setUserInput(currentQuery.slice(0, index + 1))
        index++
        
        // 智能延迟计算 - 根据字符类型调整速度
        let delay = 50 // 基础延迟
        
        if (char === '，' || char === ',') delay = 300 // 逗号停顿
        else if (char === '。' || char === '!' || char === '?') delay = 500 // 句号停顿
        else if (char === ' ') delay = 100 // 空格短停
        else if (char.match(/[a-zA-Z]/)) delay = 40 + Math.random() * 30 // 英文字母
        else delay = 30 + Math.random() * 40 // 中文字符
        
        setTimeout(typeNextCharacter, delay)
      }
    }
    
    typeNextCharacter()
  }, [currentQuery, autoDemo])

  const simulateAgentWork = (query: string) => {
    setIsProcessing(true)
    setStep(1)
    
    // 初始化Agent活动
    const initialActivities: AgentActivity[] = agents.map(agent => ({
      agentId: agent.id,
      task: agent.tasks[Math.floor(Math.random() * agent.tasks.length)],
      status: 'thinking',
      progress: 0
    }))
    
    setAgentActivities(initialActivities)

    // 模拟Agent工作流程
    setTimeout(() => {
      // 第一阶段：思考 → 工作
      setAgentActivities(prev => prev.map(activity => ({
        ...activity,
        status: 'working',
        progress: 20
      })))

      // 第二阶段：进度更新
      setTimeout(() => {
        setAgentActivities(prev => prev.map(activity => ({
          ...activity,
          progress: 60
        })))
      }, 1000)

      // 第三阶段：完成
      setTimeout(() => {
        setAgentActivities(prev => prev.map(activity => ({
          ...activity,
          status: 'completed',
          progress: 100,
          result: generateMockResult(activity.task, query)
        })))
        setStep(2)
      }, 2000)

      // 重置准备下一轮
      setTimeout(() => {
        setStep(0)
        setIsProcessing(false)
        setAgentActivities([])
        if (!autoDemo) {
          setUserInput('')
          setCurrentQuery('')
        }
      }, 3000)
    }, 1000)
  }

  const generateMockResult = (task: string, query: string): string => {
    const results: { [key: string]: string[] } = {
      '市场研究': ['市场规模：$2.3B', '增长率：15.2%', '竞争密度：中等'],
      '风险评估': ['风险等级：中等', '主要风险：技术', '建议对冲策略'],
      'ROI分析': ['预期ROI：18.5%', '回收期：2.1年', '净现值：+$1.2M'],
      '战略规划': ['核心策略：差异化', '时间线：18个月', '关键里程碑：3个'],
      '商业模式': ['收入模型：订阅制', '客户获取：B2B', '扩张路径：垂直整合'],
      '数据挖掘': ['关键洞察：7个', '数据质量：92%', '可信度：高'],
      '趋势分析': ['上升趋势：3个', '下降趋势：1个', '新兴机会：2个']
    }
    
    const taskResults = results[task] || ['分析完成', '建议已生成', '报告准备就绪']
    return taskResults[Math.floor(Math.random() * taskResults.length)]
  }

  const handleManualSubmit = () => {
    if (!userInput.trim()) return
    setAutoDemo(false)
    setCurrentQuery(userInput)
    simulateAgentWork(userInput)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleManualSubmit()
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8 min-h-[600px]">
        
        {/* 左侧：用户输入区域 */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              智能协作演示
            </h3>
            <p className="text-gray-600">
              输入您的专业需求，观察AI团队如何协作解决
            </p>
          </div>

          {/* 输入框 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                您的需求 {autoDemo && <span className="text-blue-500">(自动演示中...)</span>}
              </label>
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value)
                    setAutoDemo(false)
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="例如：帮我分析一下人工智能行业的投资机会..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <motion.div
                  className={`absolute bottom-4 right-4 w-2 h-5 bg-blue-500 rounded ${userInput ? 'opacity-0' : 'opacity-100'}`}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {!autoDemo && (
                  <button
                    onClick={() => setAutoDemo(true)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    启动自动演示
                  </button>
                )}
              </div>
              <motion.button
                onClick={handleManualSubmit}
                disabled={!userInput.trim() || isProcessing}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                {isProcessing ? '处理中...' : '提交分析'}
              </motion.button>
            </div>
          </div>

          {/* 快速示例 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-3">快速示例：</p>
            <div className="grid gap-2">
              {sampleQueries.slice(0, 2).map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUserInput(query)
                    setAutoDemo(false)
                  }}
                  className="text-left text-sm text-gray-700 hover:text-blue-600 hover:bg-white p-2 rounded transition-all"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 右侧：Agent协作区域 */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              AI团队协作实时状态
            </h3>
            <p className="text-gray-600">
              多Agent智能协作，专业分工，高效协同
            </p>
          </div>

          {/* Agent状态面板 */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 min-h-[400px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div 
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full flex items-center justify-center mb-4 mx-auto relative"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.3)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Brain className="w-8 h-8 text-blue-500" />
                      
                      {/* 旋转的小点表示团队准备状态 */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-400 rounded-full"
                          style={{
                            left: '50%',
                            top: '10%',
                            transformOrigin: '0 35px'
                          }}
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    <motion.p 
                      className="text-gray-600 text-lg font-medium"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      等待任务输入...
                    </motion.p>
                    <p className="text-gray-500 text-sm mt-2">
                      🤖 AI团队准备就绪 • 3个专业Agent在线
                    </p>
                  </div>
                </motion.div>
              )}

              {(step === 1 || step === 2) && (
                <motion.div 
                  key="working"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* 查询显示 */}
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600 mb-1">当前任务：</p>
                    <p className="font-medium text-gray-800">{currentQuery}</p>
                  </div>

                  {/* Agent工作状态 */}
                  <div className="space-y-3">
                    {agentActivities.map((activity, index) => {
                      const agent = agents.find(a => a.id === activity.agentId)!
                      const Icon = agent.icon
                      
                      return (
                        <motion.div
                          key={activity.agentId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{agent.name}</p>
                                <p className="text-sm text-gray-600">{activity.task}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {activity.status === 'thinking' && (
                                <div className="relative">
                                  <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
                                  <motion.div
                                    className="absolute inset-0 w-4 h-4 border border-orange-400 rounded-full"
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      opacity: [0.7, 0.2, 0.7]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                </div>
                              )}
                              {activity.status === 'working' && (
                                <div className="relative">
                                  <ArrowRight className="w-4 h-4 text-blue-500 animate-pulse" />
                                  <motion.div
                                    className="absolute -inset-1 bg-blue-500/20 rounded-full"
                                    animate={{
                                      rotate: [0, 360]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  />
                                </div>
                              )}
                              {activity.status === 'completed' && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200 }}
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                </motion.div>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                activity.status === 'thinking' ? 'bg-orange-100 text-orange-600' :
                                activity.status === 'working' ? 'bg-blue-100 text-blue-600' :
                                'bg-green-100 text-green-600'
                              }`}>
                                {activity.status === 'thinking' ? '思考中' :
                                 activity.status === 'working' ? '执行中' : '已完成'}
                              </span>
                            </div>
                          </div>
                          
                          {/* 进度条 */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>进度</span>
                              <span>{activity.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                              <motion.div
                                className={`h-2 rounded-full bg-gradient-to-r ${agent.color} relative`}
                                initial={{ width: 0 }}
                                animate={{ width: `${activity.progress}%` }}
                                transition={{ 
                                  duration: 0.8,
                                  ease: [0.4, 0, 0.2, 1] // 自定义缓动函数，更自然
                                }}
                              >
                                {/* 脉冲光效 */}
                                <motion.div
                                  className="absolute inset-0 bg-white/30 rounded-full"
                                  animate={{ 
                                    x: ['-100%', '100%']
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear'
                                  }}
                                />
                              </motion.div>
                              
                              {/* 外层光晕 */}
                              <motion.div
                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${agent.color} opacity-30`}
                                animate={{ 
                                  scale: [1, 1.02, 1],
                                  opacity: [0.3, 0.1, 0.3]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity
                                }}
                              />
                            </div>
                          </div>

                          {/* 结果显示 */}
                          <AnimatePresence>
                            {activity.result && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-50 rounded p-3 text-sm text-gray-700"
                              >
                                <strong>结果：</strong> {activity.result}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* 协作状态指示 */}
                  {step === 1 && (
                    <motion.div 
                      className="text-center py-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-blue-600 font-medium">
                        🤖 AI团队正在协作分析中...
                      </p>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      className="bg-green-50 border border-green-200 rounded-lg p-4 text-center relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* 庆祝粒子效果 */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-green-400 rounded-full"
                            style={{
                              left: `${20 + i * 10}%`,
                              top: '20%'
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              repeat: 1
                            }}
                          />
                        ))}
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <p className="text-green-600 font-medium mb-2 text-lg">
                          🎉 分析完成！
                        </p>
                      </motion.div>
                      <p className="text-green-700 text-sm">
                        多Agent协作已为您生成专业分析报告
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
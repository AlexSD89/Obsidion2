"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, TrendingUp, ArrowRight, Brain, Zap, User, Briefcase, PenTool } from "lucide-react"

const ROLES = [
  {
    id: "investment_alex",
    name: "Alex",
    profession: "智能投资分析师\n实时市场洞察专家",
    icon: Briefcase,
    description: "专业级AI决策系统 - 投资分析专家",
    scenario: "智能投资分析场景",
    painPoint: "实时市场洞察，精准投资建议 - 数据驱动的投资决策支持",
    solution: "Bloomberg级数据源 + AI投资分析Agent + 实时市场洞察 + Agentic Mesh协作",
    themeColor: "emerald",
    accentColor: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    metrics: {
      before: "6小时人工研究",
      after: "45分钟智能分析",
      improvement: "效率提升800%",
    },
    demoQuery: "帮我发现专注MRR增长的华人AI初创公司",
    agentSteps: [
      { name: "初创公司发现Agent", status: "processing", result: "找到127家华人AI公司" },
      { name: "MRR分析Agent", status: "processing", result: "筛选出23家MRR导向公司" },
      { name: "背景调研Agent", status: "processing", result: "识别出8家优质标的" },
      { name: "投资建议Agent", status: "completed", result: "推荐3家最有潜力公司" },
    ],
    finalOutput: "生成18页投资机会分析，包含团队背景、商业模式、竞争分析",
  },
  {
    id: "ceo_sarah",
    name: "Sarah",
    profession: "CEO战略规划师\n企业转型路径专家",
    icon: User,
    description: "专业级AI决策系统 - 战略规划专家",
    scenario: "CEO战略规划场景",
    painPoint: "企业转型路径，战略模块整合 - 全方位战略规划和执行指导",
    solution: "全维度商业分析 + 战略Agent协作 + 决策支持系统 + Agentic Mesh整合",
    themeColor: "cyan",
    accentColor: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50",
    metrics: {
      before: "2周团队讨论",
      after: "1天智能方案",
      improvement: "决策速度提升1400%",
    },
    demoQuery: "我是婚姻律师，帮我准备明天的财产分割案件",
    agentSteps: [
      { name: "案例法研究Agent", status: "processing", result: "找到32个相关判决" },
      { name: "财产评估Agent", status: "processing", result: "识别争议焦点5个" },
      { name: "策略规划Agent", status: "processing", result: "推荐3种谈判路径" },
      { name: "文件准备Agent", status: "completed", result: "生成7份专业文件" },
    ],
    finalOutput: "完整案件准备包：策略分析+证据清单+谈判方案+法律文档",
  },
  {
    id: "consultant_david",
    name: "David",
    profession: "咨询设计专家\n创新设计指标专家",
    icon: PenTool,
    description: "专业级AI决策系统 - 咨询设计专家",
    scenario: "创新咨询设计场景",
    painPoint: "创新设计指标，创意解决方案 - 设计思维驱动的业务创新",
    solution: "知识图谱 + 咨询Agent军团 + 个性化方案生成 + Agentic Mesh创新",
    themeColor: "pink",
    accentColor: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50",
    metrics: {
      before: "3天专家团队",
      after: "4小时智能输出",
      improvement: "交付效率提升1800%",
    },
    demoQuery: "我要做科技自媒体，帮我规划下周的内容创作",
    agentSteps: [
      { name: "热点追踪Agent", status: "processing", result: "识别5个热门话题" },
      { name: "用户画像Agent", status: "processing", result: "推荐3个高互动话题" },
      { name: "内容策划Agent", status: "processing", result: "生成7天内容日历" },
      { name: "拍摄建议Agent", status: "completed", result: "提供脚本+场景+素材" },
    ],
    finalOutput: "一周内容创作包：热点分析+内容日历+拍摄脚本+素材清单",
  },
]

export default function Me2NexusWebsite() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeRole, setActiveRole] = useState("investment_alex")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [aiProcessing, setAiProcessing] = useState(0)

  const switchRole = async (newRoleId: string) => {
    if (newRoleId === activeRole || isTransitioning) return

    setIsTransitioning(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setActiveRole(newRoleId)
    await new Promise((resolve) => setTimeout(resolve, 200))
    setIsTransitioning(false)
  }

  const currentRole = ROLES.find((role) => role.id === activeRole) || ROLES[0]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer1 = setInterval(() => {
      setProgress1((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 80)

    const timer2 = setInterval(() => {
      setProgress2((prev) => (prev >= 100 ? 0 : prev + 0.8))
    }, 100)

    const timer3 = setInterval(() => {
      setAiProcessing((prev) => (prev >= 1000 ? 0 : prev + 10))
    }, 60)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled ? "bg-white/98 backdrop-blur-xl shadow-sm border-b border-gray-100/80" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-white text-xs font-bold">M²</div>
                </div>
                <div className="text-lg font-bold tracking-tight">
                  <span className="text-gray-900">Me² NEXUS</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50/80 transition-all duration-200"
              >
                定价 Pricing
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50/80 transition-all duration-200"
              >
                联系我们 Contact
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md ml-2">
                立即体验 Try Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-white"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-100/50 via-blue-50/30 to-transparent"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-40 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-300/30 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-bold text-gray-900 leading-[1.05] text-balance tracking-tight">
                  Meet{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    Me² NEXUS
                  </span>
                  <br />
                  专业级{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    AI决策系统
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl leading-relaxed text-pretty">
                  <strong>Me² = Me × Me</strong> — AI驱动的实时数据洞察和预测分析。
                  <br />
                  将决策时间从数周缩短至数小时，基于大数据和AI算法的精准分析，突破传统思维模式的创新解决方案。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Get started
                </Button>
              </div>

              <div className="flex items-center space-x-5 pt-3">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-1.5">
                    <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="w-7 h-7 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <span className="text-gray-600 font-medium text-sm">专业级Agentic Mesh平台 Professional AI Platform</span>
                </div>
              </div>
            </div>

            <div className="relative lg:scale-110">
              <div className="relative">
                <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-1.5 transform hover:scale-[1.02] transition-all duration-500 border border-gray-200/60">
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="p-5 space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white text-sm font-semibold">Agentic Mesh协作中心</h3>
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-gray-400 text-xs mb-3">AI协作平台概念integration</p>

                          <div className="space-y-2">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white text-xs">智能数据分析</span>
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                              </div>
                              <p className="text-blue-100 text-xs">AI驱动的实时数据洞察...</p>
                            </div>

                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white text-xs">战略规划助手</span>
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                              </div>
                              <p className="text-purple-100 text-xs">端到端的企业转型战略...</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white text-sm font-semibold">实时处理能力</h3>
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Active</span>
                          </div>

                          <div className="space-y-2">
                            <div className="text-xs">
                              <span className="text-gray-400">效率提升:</span>
                              <p className="text-white">将决策时间从数周缩短至数小时</p>
                            </div>

                            <div className="text-xs">
                              <span className="text-gray-400">精准度增强:</span>
                              <p className="text-white">基于大数据和AI算法的精准分析</p>
                            </div>

                            <div className="bg-gray-700 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white text-xs">创新驱动:</span>
                                <span className="text-green-400 text-xs">突破传统思维模式</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Animation */}
      {/* 角色切换演示区域 - 替换原有的Product Demo Animation */}
      <section className="py-16 bg-gradient-to-b from-gray-50/90 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              选择你的专业角色，看Me² NEXUS如何工作
              <br />
              <span className="text-blue-600 text-lg">Choose Your Role, Watch Me² NEXUS in Action</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              3个专业场景演示，AI分身团队如何为不同角色提供专业支持
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-base font-bold text-gray-900 mb-3">专业角色 Professional Roles</h3>
                {ROLES.map((role, index) => {
                  const IconComponent = role.icon
                  return (
                    <div
                      key={role.id}
                      onClick={() => switchRole(role.id)}
                      className={`
                        relative cursor-pointer transition-all duration-300 transform hover:scale-[1.01]
                        ${
                          activeRole === role.id
                            ? `bg-gradient-to-r ${role.bgGradient} border-l-3 border-${role.themeColor}-500 shadow-md`
                            : "bg-white hover:bg-gray-50 border-l-3 border-transparent hover:border-gray-200"
                        }
                        rounded-r-lg p-3 border border-gray-100 shadow-sm
                      `}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`
                          w-8 h-8 rounded-lg flex items-center justify-center
                          ${
                            activeRole === role.id
                              ? `bg-gradient-to-r ${role.accentColor} text-white shadow-sm`
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-bold text-sm ${activeRole === role.id ? `text-${role.themeColor}-900` : "text-gray-900"}`}
                          >
                            {role.name}
                          </h4>
                          <p
                            className={`text-xs whitespace-pre-line ${activeRole === role.id ? `text-${role.themeColor}-700` : "text-gray-600"}`}
                          >
                            {role.profession}
                          </p>
                        </div>
                      </div>

                      {activeRole === role.id && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs">
                            <span className={`text-${role.themeColor}-600 font-medium`}>{role.scenario}</span>
                            <div className="flex items-center space-x-1">
                              <div className={`w-1.5 h-1.5 bg-${role.themeColor}-400 rounded-full animate-pulse`}></div>
                              <span className={`text-${role.themeColor}-600`}>Active</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div
                className={`transition-all duration-500 ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
                  <div className={`bg-gradient-to-r ${currentRole.accentColor} p-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          {currentRole.name} - {currentRole.description}
                        </h3>
                        <p className="text-white/90 text-sm">{currentRole.painPoint}</p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <currentRole.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid md:grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{currentRole.metrics.before}</div>
                        <div className="text-xs text-gray-600">传统方式</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className={`text-lg font-bold text-${currentRole.themeColor}-600`}>
                          {currentRole.metrics.after}
                        </div>
                        <div className="text-xs text-gray-600">Me² 方式</div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${currentRole.accentColor}`}
                      >
                        {currentRole.metrics.improvement}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* 左侧：客户输入 */}
                    <div className={`bg-gradient-to-br ${currentRole.bgGradient} p-5`}>
                      <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${currentRole.accentColor} rounded-full flex items-center justify-center mr-2`}
                        >
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        客户需求输入
                      </h4>

                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                          <div className="flex items-start space-x-2.5">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r ${currentRole.accentColor}`}
                            >
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm">"{currentRole.demoQuery}"</p>
                              <span className="text-xs text-gray-500 mt-1 block">2分钟前</span>
                            </div>
                          </div>
                        </div>

                        <div className={`rounded-lg p-3 text-white bg-gradient-to-r ${currentRole.accentColor}`}>
                          <div className="flex items-start space-x-2.5">
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">M²</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">收到！我已经启动专业AI分身团队开始工作：</p>
                              <div className="mt-2 space-y-1">
                                {currentRole.agentSteps.map((step, index) => (
                                  <div key={index} className="text-xs text-white/90">
                                    • {step.name} - {step.result}
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center mt-2">
                                <div className="flex -space-x-0.5">
                                  {[0, 1, 2].map((i) => (
                                    <div
                                      key={i}
                                      className="w-3 h-3 bg-white/30 rounded-full animate-pulse"
                                      style={{ animationDelay: `${i * 0.5}s` }}
                                    ></div>
                                  ))}
                                </div>
                                <span className="text-xs text-white/80 ml-2">AI分身团队协作中...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧：AI分身工作状态 */}
                    <div className="bg-gray-900 p-5">
                      <h4 className="text-base font-bold text-white mb-3 flex items-center">
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${currentRole.accentColor} rounded-full flex items-center justify-center mr-2`}
                        >
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        AI分身协作中心
                      </h4>

                      <div className="space-y-2.5">
                        {currentRole.agentSteps.map((step, index) => (
                          <div key={index} className="bg-gray-800 rounded-lg p-2.5 border border-gray-700">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-r ${currentRole.accentColor}`}
                                >
                                  <Brain className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-white text-xs font-medium">{step.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    step.status === "completed"
                                      ? "bg-green-400"
                                      : step.status === "processing"
                                        ? `bg-${currentRole.themeColor}-400 animate-pulse`
                                        : "bg-gray-400"
                                  }`}
                                ></div>
                                <span
                                  className={`text-xs ${
                                    step.status === "completed"
                                      ? "text-green-400"
                                      : step.status === "processing"
                                        ? `text-${currentRole.themeColor}-400`
                                        : "text-gray-400"
                                  }`}
                                >
                                  {step.status === "completed"
                                    ? "完成"
                                    : step.status === "processing"
                                      ? "处理中"
                                      : "待命"}
                                </span>
                              </div>
                            </div>
                            <div className="text-gray-300 text-xs">
                              <p>✓ {step.result}</p>
                            </div>
                          </div>
                        ))}

                        {/* 实时统计 */}
                        <div className={`rounded-lg p-2.5 mt-3 bg-gradient-to-r ${currentRole.accentColor}`}>
                          <div className="flex items-center justify-between text-white">
                            <span className="text-xs font-medium">处理速度</span>
                            <span className="text-sm font-bold">{Math.round(aiProcessing / 10)}x 人类速度</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 底部：最终输出 */}
                  <div className={`bg-gradient-to-r ${currentRole.bgGradient} p-4 border-t border-gray-100`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${currentRole.accentColor} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">专业分析报告已生成</h4>
                          <p className="text-xs text-gray-600">{currentRole.finalOutput}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium text-xs">完成</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm mb-3">
              这只是Me² NEXUS能力的一小部分展示 - 每个专业领域都有对应的AI分身团队配置
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02]">
              体验你的专业场景 Try Your Scenario
            </Button>
          </div>
        </div>
      </section>

      {/* Introducing Me² NEXUS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 mb-6 tracking-tight">
              重新定义专业工作方式的{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent italic">
                三重转换
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              不是购买软件，而是雇佣AI分身团队。不是使用工具，而是获得更强的专业自己。
              <br />
              <strong>核心价值承诺：你还是你，只是更强大了。</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg group bg-white">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">从"人使用AI工具"到"人与AI分身共生"</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                不是用ChatGPT问答，而是拥有24/7专业AI分身团队，具备Bloomberg Terminal级数据+投行级分析能力。
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg group bg-white">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">从"购买软件"到"雇佣AI分身团队"</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                ¥99/月获得专业团队级能力，替代¥30-200万/年传统咨询成本，提供企业级专业分析服务。
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg group bg-white">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">从"提升效率"到"指数级放大专业能力"</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                不是快一点，而是专业能力×1000倍放大。突破时间、认知、处理、复制四重边界限制。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Scale Your Professional Capability */}
      <section className="py-20 bg-gradient-to-b from-gray-50/90 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 mb-6 text-balance tracking-tight">
              突破专业边界，实现
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent italic">
                指数级能力放大
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
              Bloomberg Terminal级专业数据 + Goldman Sachs级分析质量 —
              <br />
              ¥99/月获得¥200万/年专业团队的能力。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg group bg-white overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 min-h-[200px] flex flex-col justify-center space-y-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg px-3 py-2 text-white flex items-center justify-between shadow-md">
                  <span className="text-sm font-medium">投资分析AI工作中..</span>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg px-3 py-2 text-white flex items-center justify-between shadow-md">
                  <span className="text-sm font-medium">法律研究AI分析中..</span>
                  <div
                    className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg px-3 py-2 text-gray-600">
                  <span className="text-sm font-medium">内容创作AI待命中..</span>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="text-lg mr-2.5">⏰</div>
                <h3 className="text-lg font-bold text-gray-900">突破时间边界 Save Time</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                专业人士每周花费10-15小时手动研究分析。Me² AI分身团队24/7工作， 让你专注于最重要的专业判断和决策。
              </p>
            </Card>

            <Card className="p-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg group bg-white overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 min-h-[200px] space-y-3">
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                      <span className="text-xs text-gray-600">Bloomberg</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 bg-green-600 rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-bold">CB</span>
                      </div>
                      <span className="text-xs text-gray-600">Insights</span>
                    </div>
                    <div className="w-5 h-5 bg-purple-600 rounded-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">L</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-md px-1.5 py-1 flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                      <span className="text-white text-xs font-bold">金融数据</span>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-md px-1.5 py-1 flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                      <span className="text-white text-xs font-bold">创投情报</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-md px-1.5 py-1 flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                      <span className="text-white text-xs font-bold">法律数据</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="text-lg mr-2.5">🔍</div>
                <h3 className="text-lg font-bold text-gray-900">突破认知边界 Get Clarity</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                获得Bloomberg Terminal级付费专业数据，1000+信息源实时监控， 将复杂信息转化为可执行的专业洞察。
              </p>
            </Card>

            <Card className="p-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg group bg-white overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl px-4 py-2.5 mb-3 transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="flex items-center justify-center space-x-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-white" />
                      <span className="text-base font-bold text-white">×{Math.round(aiProcessing / 10)} 能力放大</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200">
                      <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="text-lg mr-2.5">💰</div>
                <h3 className="text-lg font-bold text-gray-900">突破规模边界 Grow Value</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                个人Know-How数字化复制放大，专业判断力规模化应用， 实现专业能力的指数级增长和价值变现。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/96 to-purple-600/96"></div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400/25 rounded-full blur-3xl -translate-x-40 -translate-y-40"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/25 rounded-full blur-3xl translate-x-40 translate-y-40"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-100 text-base mb-3">获得Bloomberg Terminal级数据 + Goldman Sachs级分析的AI分身团队</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold mb-7 text-balance tracking-tight">
            准备好突破专业边界了吗？
            <br />
            <span className="italic bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Are you ready to level up?
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-7 py-2.5 rounded-full text-base font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
              免费生成MRD 🚀 Free MRD
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-7 py-2.5 rounded-full text-base font-bold transition-all duration-200 hover:scale-[1.02] bg-transparent"
            >
              ¥99/月开始 Start ¥99/month
            </Button>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto"></div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">选择适合您的方案</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">从免费体验到专业服务，为每一位专业人士量身定制</p>

            <div className="mt-6 inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse">
              🔥 内测阶段：专业版限时免费使用！
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 免费体验 */}
            <Card className="bg-gray-800 border-gray-700 p-8 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl">⭐</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">免费体验</h3>
                <div className="text-4xl font-bold mb-1">¥0</div>
                <div className="text-gray-400 text-sm mb-6">/月</div>
                <p className="text-gray-300 mb-8">探索AI增强的专业能力</p>

                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">每日1次报告生成</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">×</span>
                    </div>
                    <span className="text-gray-400">超额生成 15元/次</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">3个基础Agent仓库</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">基础MRD生成</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">社区支持</span>
                  </div>
                </div>

                <Button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                  立即开始免费体验
                </Button>
              </div>
            </Card>

            {/* 专业方案 - 推荐 */}
            <Card className="bg-gradient-to-b from-blue-600 to-blue-700 border-blue-500 p-8 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 text-sm font-bold">
                推荐方案
              </div>

              <div className="absolute top-8 left-0 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 text-xs font-bold transform -rotate-12 -translate-x-2">
                内测免费
              </div>

              <div className="text-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl">🚀</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">专业方案</h3>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="text-2xl font-bold text-gray-300 line-through">¥99</div>
                  <div className="text-4xl font-bold">¥0</div>
                </div>
                <div className="text-blue-100 text-sm mb-6">/月 (内测期间)</div>
                <p className="text-blue-100 mb-8">专业人士的AI超级增强器</p>

                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-blue-100">每日3次报告生成</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-blue-100">超额生成 12元/次</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-blue-100">5个专业Agent仓库</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-blue-100">高级MRD和分析报告</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-blue-100">优先技术支持</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg">
                  立即升级专业版
                </Button>
              </div>
            </Card>

            {/* 企业定制 */}
            <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-orange-500 p-8 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl">📋</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">企业定制</h3>
                <div className="text-4xl font-bold mb-1">定制</div>
                <div className="text-gray-400 text-sm mb-6">价格</div>
                <p className="text-gray-300 mb-8">企业级AI解决方案</p>

                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">无限制报告生成</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">定制化Agent开发</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">私有化部署选项</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">7×24专属技术支持</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">SLA服务保障</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg">
                  联系商务洽谈
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">所有方案都包含基础的AI分身协作功能，升级后可获得更强大的专业能力</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 border-t border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="col-span-2">
              <div className="text-xl font-bold text-gray-900 mb-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Me² NEXUS
                </span>
              </div>
              <p className="text-gray-600 max-w-md leading-relaxed mb-3 text-sm">
                全球首款企业级Agentic Mesh AI分身协作平台。
                <br />
                Me² = Me × Me，专业能力指数级放大。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">公司 Company</h4>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    联系我们 Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    加入邮件列表 Join Email List
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">法律 Legal</h4>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    隐私政策 Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    服务条款 Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200/80 mt-6 pt-5 text-center">
            <p className="text-gray-500 text-xs">© 2024 Me² NEXUS. 你还是你，只是更强大了。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

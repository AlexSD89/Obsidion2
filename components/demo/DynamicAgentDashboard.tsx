'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Users, ArrowRight, Lightbulb, Shield, MessageSquare, FileText, Settings, Clock, Network, Database, Zap, Target, Award, Star, Trophy, Gift, Play } from 'lucide-react';

// Agent状态类型定义
type AgentStatus = 'ready' | 'working' | 'completed';
type AgentCategory = 'engineering' | 'data' | 'marketing' | 'design' | 'security' | 'qa';

interface CoreAgent {
  name: string;
  role: string;
  status: AgentStatus;
  icon: React.ComponentType<any>;
  color: string;
}

interface ProfessionalAgent {
  name: string;
  role: string;
  category: AgentCategory;
  icon: React.ComponentType<any>;
  color: string;
}

interface DataSource {
  name: string;
  type: 'premium' | 'public' | 'internal';
  status: 'active' | 'standby';
  icon: React.ComponentType<any>;
}

interface FinalDelivery {
  title: string;
  capabilities: string;
  improvements: {
    efficiency: { before: string; after: string; boost: string };
    coverage: { before: string; after: string; boost: string };
    depth: { before: string; after: string; boost: string };
    availability: { before: string; after: string; boost: string };
  };
}

interface AgenticRole {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  coreAgents: CoreAgent[];
  professionalAgents: ProfessionalAgent[];
  dataSources: DataSource[];
  finalDelivery: FinalDelivery;
  sampleQueries: string[];
}

// 完整的Agentic Mesh角色配置
const agenticMeshRoles: Record<string, AgenticRole> = {
  invest: {
    id: 'invest',
    name: '投资分析师',
    icon: '📊',
    description: '专业投资分析与风险评估',
    color: 'from-blue-500 to-indigo-600',
    coreAgents: [
      { name: 'analyst分析师', role: '需求分析与任务拆解', status: 'ready', icon: Brain, color: 'from-purple-500 to-indigo-600' },
      { name: 'architect架构师', role: '投资分析架构设计', status: 'ready', icon: Settings, color: 'from-gray-500 to-slate-600' },
      { name: 'bmad编排器', role: '分析流程协调编排', status: 'ready', icon: Network, color: 'from-emerald-500 to-green-600' }
    ],
    professionalAgents: [
      { name: 'ai-engineer', role: '投资模型算法构建', category: 'engineering', icon: Zap, color: 'from-yellow-500 to-orange-600' },
      { name: 'data-analyst', role: '市场数据挖掘分析', category: 'data', icon: Database, color: 'from-cyan-500 to-blue-600' },
      { name: 'cross-validation-engine', role: '多维度交叉验证', category: 'data', icon: Shield, color: 'from-red-500 to-pink-600' }
    ],
    dataSources: [
      { name: 'Bloomberg Terminal', type: 'premium', status: 'active', icon: Target },
      { name: 'CB Insights', type: 'premium', status: 'active', icon: Lightbulb },
      { name: '行业研究报告', type: 'public', status: 'standby', icon: FileText }
    ],
    finalDelivery: {
      title: 'Me²投资分析分身',
      capabilities: 'Bloomberg级数据分析 + Goldman Sachs级投资洞察',
      improvements: {
        efficiency: { before: '3天研究', after: '30分钟', boost: '×144倍' },
        coverage: { before: '5个来源', after: '50+数据源', boost: '×10倍' },
        depth: { before: '个人经验', after: '行业顶级标准', boost: '专业分身级' },
        availability: { before: '8小时/天', after: '24/7全天候', boost: '永不疲劳' }
      }
    },
    sampleQueries: [
      "帮我发现专注MRR增长的华人AI初创公司，并分析投资价值",
      "这个SaaS项目值得投资吗？请提供完整的尽职调查报告",
      "当前市场环境下，哪些赛道最具投资潜力？"
    ]
  },
  legal: {
    id: 'legal',
    name: '法律服务专家',
    icon: '⚖️',
    description: '智能法律策略与案例分析',
    color: 'from-purple-500 to-violet-600',
    coreAgents: [
      { name: 'analyst分析师', role: '案件需求深度分析', status: 'ready', icon: Brain, color: 'from-purple-500 to-indigo-600' },
      { name: 'architect架构师', role: '诉讼策略架构设计', status: 'ready', icon: Settings, color: 'from-gray-500 to-slate-600' },
      { name: 'bmad编排器', role: '法务流程智能编排', status: 'ready', icon: Network, color: 'from-emerald-500 to-green-600' }
    ],
    professionalAgents: [
      { name: 'ai-engineer', role: '案例检索算法优化', category: 'engineering', icon: Zap, color: 'from-yellow-500 to-orange-600' },
      { name: 'data-analyst', role: '判例数据深度分析', category: 'data', icon: Database, color: 'from-cyan-500 to-blue-600' },
      { name: 'content-creator', role: '法律文书智能生成', category: 'marketing', icon: MessageSquare, color: 'from-green-500 to-emerald-600' }
    ],
    dataSources: [
      { name: 'LexisNexis法律数据库', type: 'premium', status: 'active', icon: Shield },
      { name: '最高法院判例库', type: 'public', status: 'active', icon: FileText },
      { name: '法规更新系统', type: 'internal', status: 'standby', icon: Clock }
    ],
    finalDelivery: {
      title: 'Me²法律服务分身',
      capabilities: '顶级律所级案例分析 + 诉讼策略制定',
      improvements: {
        efficiency: { before: '2周准备', after: '1天完成', boost: '×14倍' },
        coverage: { before: '手动检索', after: '全库智能搜索', boost: '×100倍' },
        depth: { before: '经验判断', after: '数据驱动洞察', boost: 'AI增强级' },
        availability: { before: '工作时间', after: '24/7法律顾问', boost: '全时守护' }
      }
    },
    sampleQueries: [
      "我是婚姻律师，帮我准备明天的财产分割案件策略",
      "这个知识产权诉讼案，请分析相似判例并制定最优策略",
      "公司合规审查发现问题，需要法律风险评估和解决方案"
    ]
  },
  content: {
    id: 'content',
    name: '内容创作达人',
    icon: '✍️',
    description: '病毒传播策划与内容创作',
    color: 'from-emerald-500 to-green-600',
    coreAgents: [
      { name: 'analyst分析师', role: '内容趋势深度分析', status: 'ready', icon: Brain, color: 'from-purple-500 to-indigo-600' },
      { name: 'architect架构师', role: '传播架构策略设计', status: 'ready', icon: Settings, color: 'from-gray-500 to-slate-600' },
      { name: 'bmad编排器', role: '创作流程智能编排', status: 'ready', icon: Network, color: 'from-emerald-500 to-green-600' }
    ],
    professionalAgents: [
      { name: 'tiktok-strategist', role: '抖音病毒传播策略', category: 'marketing', icon: Play, color: 'from-pink-500 to-rose-600' },
      { name: 'content-creator', role: '多平台内容创意', category: 'marketing', icon: MessageSquare, color: 'from-green-500 to-emerald-600' },
      { name: 'data-analyst', role: '用户行为洞察分析', category: 'data', icon: Database, color: 'from-cyan-500 to-blue-600' }
    ],
    dataSources: [
      { name: 'TikTok/抖音 API', type: 'premium', status: 'active', icon: Play },
      { name: '社交媒体趋势', type: 'public', status: 'active', icon: Users },
      { name: '用户画像数据库', type: 'internal', status: 'standby', icon: Target }
    ],
    finalDelivery: {
      title: 'Me²内容创作分身',
      capabilities: '顶级网红级热点捕捉 + 病毒传播策划',
      improvements: {
        efficiency: { before: '3天策划', after: '4小时输出', boost: '×18倍' },
        coverage: { before: '单平台', after: '全平台矩阵', boost: '×8倍' },
        depth: { before: '创意直觉', after: '数据驱动创意', boost: 'AI创意级' },
        availability: { before: '灵感等待', after: '24/7创意涌现', boost: '永不枯竭' }
      }
    },
    sampleQueries: [
      "我要做科技自媒体，帮我规划下周的病毒传播内容",
      "如何让我的产品在抖音上实现10万+传播？",
      "策划一个能引发全网讨论的话题营销活动"
    ]
  }
};

interface AgentActivity {
  agentId: string;
  agentName: string;
  task: string;
  status: 'thinking' | 'working' | 'completed';
  result?: string;
  progress: number;
  layer: 'core' | 'professional' | 'data';
}

export default function DynamicAgentDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>('invest');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([]);
  const [step, setStep] = useState(0); // 0: 准备, 1: 处理中, 2: 完成, 3: 分身展示
  const [selectedQuery, setSelectedQuery] = useState<string>('');

  const currentRole = agenticMeshRoles[selectedRole];

  // 启动Agent协作流程
  const startAgenticMesh = (query: string) => {
    setSelectedQuery(query);
    setIsProcessing(true);
    setStep(1);
    
    // 初始化所有Agent活动
    const coreActivities: AgentActivity[] = currentRole.coreAgents.map(agent => ({
      agentId: agent.name,
      agentName: agent.name,
      task: agent.role,
      status: 'thinking',
      progress: 0,
      layer: 'core'
    }));

    const professionalActivities: AgentActivity[] = currentRole.professionalAgents.map(agent => ({
      agentId: agent.name,
      agentName: agent.name,
      task: agent.role,
      status: 'thinking',
      progress: 0,
      layer: 'professional'
    }));

    const dataActivities: AgentActivity[] = currentRole.dataSources.map(source => ({
      agentId: source.name,
      agentName: source.name,
      task: `连接${source.name}数据源`,
      status: 'thinking',
      progress: 0,
      layer: 'data'
    }));

    setAgentActivities([...coreActivities, ...professionalActivities, ...dataActivities]);

    // 分阶段执行
    setTimeout(() => {
      // 第一阶段：Core Agents开始工作
      setAgentActivities(prev => prev.map(activity => 
        activity.layer === 'core' 
          ? { ...activity, status: 'working', progress: 30 }
          : activity
      ));
    }, 1000);

    setTimeout(() => {
      // 第二阶段：Professional Agents介入
      setAgentActivities(prev => prev.map(activity => ({
        ...activity,
        status: activity.layer === 'data' ? 'thinking' : 'working',
        progress: activity.layer === 'core' ? 60 : activity.layer === 'professional' ? 40 : 0
      })));
    }, 2500);

    setTimeout(() => {
      // 第三阶段：Data Sources激活
      setAgentActivities(prev => prev.map(activity => ({
        ...activity,
        status: 'working',
        progress: activity.layer === 'core' ? 90 : activity.layer === 'professional' ? 70 : 50
      })));
    }, 4000);

    setTimeout(() => {
      // 第四阶段：全部完成
      setAgentActivities(prev => prev.map(activity => ({
        ...activity,
        status: 'completed',
        progress: 100,
        result: generateMockResult(activity.task, query)
      })));
      setStep(2);
    }, 5500);

    setTimeout(() => {
      // 最终阶段：展示Me²分身
      setStep(3);
    }, 7000);

    setTimeout(() => {
      // 重置
      setStep(0);
      setIsProcessing(false);
      setAgentActivities([]);
      setSelectedQuery('');
    }, 10000);
  };

  const generateMockResult = (task: string, query: string): string => {
    const results: { [key: string]: string[] } = {
      '需求分析与任务拆解': ['需求解构完成', '关键要素识别', '优先级排序'],
      '投资分析架构设计': ['分析框架建立', '评估指标确定', '风险模型构建'],
      '分析流程协调编排': ['工作流优化', '资源分配完成', '时间线规划'],
      '投资模型算法构建': ['算法模型就绪', '参数调优完成', '回测验证通过'],
      '市场数据挖掘分析': ['数据抓取完成', '趋势分析就绪', '异常检测完成'],
      '多维度交叉验证': ['验证框架部署', '一致性检查完成', '可信度评估'],
      '连接Bloomberg Terminal数据源': ['实时数据连接', '历史数据同步', 'API调用优化'],
      '连接CB Insights数据源': ['创投数据获取', '行业报告解析', '竞品分析完成'],
      '连接行业研究报告数据源': ['研究报告整合', '专家观点提取', '趋势预测生成']
    };
    
    const taskResults = results[task] || ['处理完成', '分析就绪', '结果产出'];
    return taskResults[Math.floor(Math.random() * taskResults.length)];
  };

  return (
    <div className="w-full max-w-8xl mx-auto p-6">
      <div className="grid lg:grid-cols-12 gap-6 min-h-[700px]">
        
        {/* 左侧：角色选择区 */}
        <div className="lg:col-span-3">
          <motion.div 
            className="sticky top-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              选择AI分身
            </h3>
            
            <div className="space-y-3">
              {Object.values(agenticMeshRoles).map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center text-2xl shrink-0`}>
                      {role.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm">{role.name}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{role.description}</p>
                      {selectedRole === role.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-2 pt-2 border-t border-blue-200"
                        >
                          <div className="flex items-center gap-1 text-xs text-blue-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            {role.coreAgents.length + role.professionalAgents.length}个Agent就绪
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 右侧：Agentic Mesh工作区 */}
        <div className="lg:col-span-9">
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Network className="w-6 h-6 text-purple-600" />
              Agentic Mesh - AI Agent互联网
            </h3>

            {/* 查询输入区 */}
            <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-3">专业场景示例：</p>
              <div className="grid md:grid-cols-2 gap-2">
                {currentRole.sampleQueries.slice(0, 2).map((query, index) => (
                  <button
                    key={index}
                    onClick={() => startAgenticMesh(query)}
                    disabled={isProcessing}
                    className="text-left text-sm p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-blue-600 font-medium">场景 {index + 1}：</span>
                    <span className="text-gray-700 ml-2">"{query}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 三层Agent网络可视化 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 min-h-[500px]">
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
                        className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full flex items-center justify-center mb-4 mx-auto relative"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.3)",
                            "0 0 0 20px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Network className="w-10 h-10 text-blue-600" />
                      </motion.div>
                      
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {currentRole.name} Agentic Mesh 就绪
                      </p>
                      <p className="text-gray-500 text-sm">
                        🎯 {currentRole.coreAgents.length}个核心Agent + {currentRole.professionalAgents.length}个专业Agent + {currentRole.dataSources.length}个数据源
                      </p>
                    </div>
                  </motion.div>
                )}

                {(step === 1 || step === 2) && (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* 当前查询 */}
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-1">专业需求：</p>
                      <p className="font-medium text-gray-800">{selectedQuery}</p>
                    </div>

                    {/* 三层架构展示 */}
                    <div className="space-y-6">
                      {/* 第一层：Core Agents */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          核心层：BMAD架构 ({currentRole.coreAgents.length}个)
                        </h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          {currentRole.coreAgents.map((agent, index) => {
                            const activity = agentActivities.find(a => a.agentId === agent.name);
                            const Icon = agent.icon;
                            return (
                              <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-800 truncate">{agent.name}</p>
                                    <p className="text-xs text-gray-600 truncate">{agent.role}</p>
                                  </div>
                                </div>
                                {activity && (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">进度</span>
                                      <span className="text-gray-700">{activity.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                      <motion.div
                                        className={`h-1.5 rounded-full bg-gradient-to-r ${agent.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${activity.progress}%` }}
                                        transition={{ duration: 0.8 }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 第二层：Professional Agents */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          专业层：Claude Agents ({currentRole.professionalAgents.length}个)
                        </h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          {currentRole.professionalAgents.map((agent, index) => {
                            const activity = agentActivities.find(a => a.agentId === agent.name);
                            const Icon = agent.icon;
                            return (
                              <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-800 truncate">{agent.name}</p>
                                    <p className="text-xs text-gray-600 truncate">{agent.role}</p>
                                  </div>
                                </div>
                                {activity && (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">进度</span>
                                      <span className="text-gray-700">{activity.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                      <motion.div
                                        className={`h-1.5 rounded-full bg-gradient-to-r ${agent.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${activity.progress}%` }}
                                        transition={{ duration: 0.8 }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 第三层：Data Sources */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          数据层：专业数据源 ({currentRole.dataSources.length}个)
                        </h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          {currentRole.dataSources.map((source, index) => {
                            const activity = agentActivities.find(a => a.agentId === source.name);
                            const Icon = source.icon;
                            return (
                              <motion.div
                                key={source.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-800 truncate">{source.name}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                      <div className={`w-2 h-2 rounded-full ${source.type === 'premium' ? 'bg-yellow-500' : source.type === 'public' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                                      <span className="text-xs text-gray-600">{source.type}</span>
                                    </div>
                                  </div>
                                </div>
                                {activity && (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">连接</span>
                                      <span className="text-gray-700">{activity.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                      <motion.div
                                        className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${activity.progress}%` }}
                                        transition={{ duration: 0.8 }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 协作状态 */}
                    {step === 1 && (
                      <motion.div 
                        className="text-center py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="text-blue-600 font-medium">
                          🔄 Agentic Mesh协作中... {currentRole.name}分身正在生成
                        </p>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div 
                        className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <p className="text-green-600 font-medium mb-2">
                          ✅ 三层Agent网络协作完成！
                        </p>
                        <p className="text-green-700 text-sm">
                          正在生成您的专业级{currentRole.name}分身...
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    {/* 游戏通关式分身展示 */}
                    <div className="relative">
                      {/* 庆祝特效 */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                            style={{
                              left: `${20 + (i % 4) * 20}%`,
                              top: `${20 + Math.floor(i / 4) * 20}%`,
                            }}
                            animate={{
                              y: [0, -30, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.1,
                              repeat: 1,
                            }}
                          />
                        ))}
                      </div>

                      {/* 主要内容 */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.1, 1] }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative z-10"
                      >
                        <div className={`w-32 h-32 bg-gradient-to-br ${currentRole.color} rounded-full flex items-center justify-center text-6xl mb-6 mx-auto relative`}>
                          {currentRole.icon}
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-yellow-400"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 180, 360]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity
                            }}
                          />
                        </div>

                        <motion.h2 
                          className="text-3xl font-bold text-gray-800 mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          🎉 {currentRole.finalDelivery.title} 交付完成！
                        </motion.h2>

                        <motion.p 
                          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          {currentRole.finalDelivery.capabilities}
                        </motion.p>

                        {/* 能力提升展示 */}
                        <motion.div 
                          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 }}
                        >
                          {Object.entries(currentRole.finalDelivery.improvements).map(([key, improvement], index) => (
                            <div key={key} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                              <div className="text-center">
                                <div className="text-2xl mb-2">
                                  {key === 'efficiency' ? '⚡' : 
                                   key === 'coverage' ? '📊' :
                                   key === 'depth' ? '🧠' : '🌟'}
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                  {key === 'efficiency' ? '效率提升' :
                                   key === 'coverage' ? '覆盖范围' :
                                   key === 'depth' ? '专业深度' : '可用性'}
                                </p>
                                <p className="text-xs text-gray-500 mb-2">
                                  {improvement.before} → {improvement.after}
                                </p>
                                <motion.p 
                                  className="font-bold text-blue-600"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                >
                                  {improvement.boost}
                                </motion.p>
                              </div>
                            </div>
                          ))}
                        </motion.div>

                        <motion.div
                          className="mt-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span>您的专业AI分身已准备就绪，随时为您服务</span>
                            <Trophy className="w-4 h-4 text-yellow-500" />
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
import React from 'react'
import { motion } from 'framer-motion'
import { useAccount, useDisconnect } from 'wagmi'
import { useChatStore } from '../../stores/chatStore'
import { useUserStore } from '../../stores/userStore'
import { getIPFSService } from '../../utils/ipfs'

export const ChatSidebar: React.FC = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { users, activeChat, setActiveChat } = useChatStore()
  const { user } = useUserStore()
  const ipfsService = getIPFSService()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatLastSeen = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          {user?.profileImageHash ? (
            <img
              src={ipfsService.getFileUrl(user.profileImageHash)}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user?.displayName?.[0] || '?'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">
              {user?.displayName || 'Anonymous'}
            </h3>
            <p className="text-blue-200 text-sm truncate">
              {user?.username || formatAddress(address || '')}
            </p>
          </div>
          <button
            onClick={() => disconnect()}
            className="text-red-400 hover:text-red-300 transition-colors p-1"
            title="Disconnect"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white font-mono mb-2">
          AmigoChat
        </h2>
        <p className="text-blue-200 text-sm">
          {users.length} Amigo{users.length !== 1 ? 's' : ''} online
        </p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Group Chat */}
        <motion.button
          onClick={() => setActiveChat(null)}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          whileTap={{ scale: 0.98 }}
          className={`w-full p-4 text-left border-b border-white/5 transition-all ${
            activeChat === null
              ? 'bg-blue-500/20 border-blue-400/30'
              : 'hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold">Global Chat</h4>
              <p className="text-blue-200 text-sm">
                Chat with all Amigos
              </p>
            </div>
            {activeChat === null && (
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            )}
          </div>
        </motion.button>

        {/* Direct Messages */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-2">
            Direct Messages
          </h3>
        </div>

        {users
          .filter(chatUser => chatUser.address !== address)
          .map((chatUser) => (
            <motion.button
              key={chatUser.address}
              onClick={() => setActiveChat(chatUser.address)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 text-left border-b border-white/5 transition-all ${
                activeChat === chatUser.address
                  ? 'bg-blue-500/20 border-blue-400/30'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {chatUser.profileImageHash ? (
                  <img
                    src={ipfsService.getFileUrl(chatUser.profileImageHash)}
                    alt={chatUser.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {chatUser.displayName[0]}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold truncate">
                    {chatUser.displayName}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      chatUser.isOnline ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                    <p className="text-blue-200 text-sm truncate">
                      {chatUser.isOnline ? 'Online' : formatLastSeen(chatUser.lastSeen)}
                    </p>
                  </div>
                </div>
                {activeChat === chatUser.address && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </div>
            </motion.button>
          ))
        }

        {users.filter(u => u.address !== address).length === 0 && (
          <div className="p-4 text-center">
            <p className="text-blue-200 text-sm">
              No other users online yet.
              <br />
              Share AmigoChat with your friends! 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
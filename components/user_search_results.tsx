import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types"

interface UserSearchResultsProps {
  users: User[]
  onSelectUser: (user: User) => void
}

export function UserSearchResults({ users, onSelectUser }: UserSearchResultsProps) {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <button
          key={user.id}
          className="flex items-center gap-2 p-2 hover:bg-white/20 cursor-pointer w-full text-left rounded-md transition-colors duration-200"
          onClick={() => onSelectUser(user)}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.profilePicture} alt={user.fullName} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-white font-medium block">{user.fullName}</span>
            <span className="text-white/70 text-sm">@{user.username}</span>
          </div>
        </button>
      ))}
    </div>
  )
}


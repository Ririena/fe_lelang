'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

const accessRule = [
  {
    paths: ['/dashboard', '/admin', '/petugas'],
    allowRoles: ['admin', 'petugas'],
  },
  {
    paths: ['/lelang', '/profile'],
    allowRoles: ['masyarakat', 'admin', 'petugas'],
  },
]

export default function RoleAccessProvider({ children }) {
  const { user, token, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (loading || !pathname) return

    const rule = accessRule.find(rule =>
      rule.paths.some(path => pathname.startsWith(path))
    )


    if (!token || !user) {
      router.replace('/login')
      return
    }

    if (rule && !rule.allowRoles.includes(user.role)) {
      router.replace('/not-authorized')
    }
  }, [pathname, user, token, router, loading])

  return children
}

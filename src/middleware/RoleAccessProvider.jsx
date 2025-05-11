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

    // Cek apakah path yang diakses termasuk dalam daftar yang memerlukan autentikasi
    const rule = accessRule.find(rule =>
      rule.paths.some(path => pathname.startsWith(path))
    )

    // Jika path memerlukan autentikasi, cek login status dan role
    if (rule) {
      // Pengguna belum login atau tidak memiliki akses role yang sesuai
      if (!token || !user || !user.role || !rule.allowRoles.includes(user.role)) {
        // Jika pengguna belum login, arahkan ke login yang sesuai (login admin atau login biasa)
        if (!token) {
          if (pathname.startsWith('/admin') || pathname.startsWith('/petugas')) {
            router.replace('/admin/login') // Login untuk admin
          } else {
            router.replace('/login') // Login untuk pengguna biasa
          }
        } else {
          router.replace('/not-authorized') // Jika sudah login tapi role tidak sesuai
        }
      }
    } else if (!token && !pathname.startsWith('/register')) {
      // Jika path yang diakses tidak memerlukan autentikasi dan pengguna belum login
      router.replace('/login') // Hanya arahkan ke login jika bukan halaman register
    }
  }, [pathname, user, token, router, loading])

  return children
}

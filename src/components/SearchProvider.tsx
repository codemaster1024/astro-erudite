import { useState, useEffect } from 'react'
import type { CollectionEntry } from 'astro:content'

interface SearchProviderProps {
  posts: CollectionEntry<'blog'>[]
  className?: string
}

export default function SearchProvider({ posts, className }: SearchProviderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // 处理全局键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  return (
    <>
      <div className={className}>
        {/* 搜索按钮 */}
        <button
          className="inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground text-foreground/60 hover:text-foreground p-1 cursor-pointer"
          onClick={() => setIsSearchOpen(true)}
          title="搜索文章 (Ctrl+K)"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      
      {/* 搜索对话框 */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm" 
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="fixed left-[50%] top-16 z-[10000] w-full max-w-lg translate-x-[-50%] border bg-background shadow-lg rounded-lg" 
            onClick={e => e.stopPropagation()}
          >
            <SearchDialogContent posts={posts} onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

function SearchDialogContent({ posts, onClose }: { posts: CollectionEntry<'blog'>[], onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  // 简化的搜索功能
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const filtered = posts.filter(post => 
      post.data.title.toLowerCase().includes(query.toLowerCase()) ||
      post.data.description?.toLowerCase().includes(query.toLowerCase()) ||
      post.data.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 10)

    setResults(filtered)
  }, [query, posts])

  return (
    <div className="flex flex-col">
      <div className="flex items-center border-b px-3">
        <svg
          className="h-4 w-4 mr-2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="搜索文章..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
        {!query && (
          <div className="py-4 px-3 text-sm text-muted-foreground">
            <div className="mb-2 font-medium">快速搜索</div>
            <div className="text-xs">
              • 输入文章标题关键词<br/>
              • 搜索文章描述内容<br/>
              • 按标签筛选文章<br/>
              • 按 ESC 键关闭搜索
            </div>
          </div>
        )}
        {query && results.length === 0 && (
          <div className="py-6 text-center text-sm">没有找到相关文章</div>
        )}
        {results.length > 0 && (
          <div className="overflow-hidden p-1 text-foreground">
            {results.map((post) => (
              <div
                key={post.id}
                className="relative flex cursor-pointer select-none items-start rounded-sm px-2 py-3 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  window.location.href = `/blog/${post.id}`
                  onClose()
                }}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.data.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.data.date).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  {post.data.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.data.description}
                    </p>
                  )}
                  {post.data.tags && post.data.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {post.data.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
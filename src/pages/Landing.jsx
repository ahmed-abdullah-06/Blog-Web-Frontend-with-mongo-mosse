import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// Floating code lines for the hero background
const CODE_LINES = ['const post = await db.posts.findById(id)', 'export default function Article({ slug }) {', 'import { marked } from "marked"', '  return <Markdown>{content}</Markdown>', 'git commit -m "publish: new post"', 'npm run dev', 'const [posts, setPosts] = useState([])', '  useEffect(() => { fetchPosts() }, [])', 'interface Post { title: string; slug: string }', 'export async function getStaticProps() {', '  const data = await fetch("/api/posts")', 'type Author = { name: string; avatar: string }', 'const mdx = await compileMDX({ source })', '// TODO: add syntax highlighting', 'yarn add @mdx-js/react'];
function FloatingCode() {
  return <div style={{
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0
  }} aria-hidden>
      {CODE_LINES.map((line, i) => <div key={i} style={{
      position: 'absolute',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11px',
      color: 'rgba(255,255,255,0.035)',
      whiteSpace: 'nowrap',
      top: `${5 + i * 6.1 % 88}%`,
      left: `${i * 13.7 % 72}%`,
      transform: `rotate(${i % 3 === 0 ? -1 : i % 3 === 1 ? 0.5 : -0.3}deg)`
    }}>
          {line}
        </div>)}
      {/* Radial glow at center */}
      <div style={{
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '600px',
      background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0.04) 40%, transparent 70%)',
      pointerEvents: 'none'
    }} />
    </div>;
}
function Navbar({
  scrolled,
  onLogin,
  onSignup
}) {
  return <AppBar position="fixed" elevation={0} sx={{
    background: scrolled ? 'rgba(20,20,20,0.98)' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
    boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    transition: 'background 0.3s ease, box-shadow 0.3s ease'
  }}>
      <Toolbar sx={{
      maxWidth: '1200px',
      width: '100%',
      mx: 'auto',
      px: '24px !important',
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
        {/* Logo */}
        <Box component="button" onClick={onSignup} sx={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        p: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '20px',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '-0.02em'
      }}>
          {'<'}
          <Box component="span" sx={{
          color: '#4F46E5'
        }}>DevBlog</Box>
          {' />'}
        </Box>

        {/* Login button */}
        <Button onClick={onLogin} variant="outlined" sx={{
        color: '#ffffff',
        borderColor: 'rgba(255,255,255,0.2)',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'none',
        borderRadius: '6px',
        px: '20px',
        py: '7px',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.45)',
          background: 'rgba(255,255,255,0.05)'
        }
      }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>;
}
function HeroSection({
  onLogin,
  onSignup
}) {
  return <section style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    overflow: 'hidden'
  }}>
      <FloatingCode />

      {/* Bottom gradient fade */}
      <div aria-hidden style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '180px',
      background: 'linear-gradient(to bottom, transparent, #0D0D0D)',
      pointerEvents: 'none',
      zIndex: 1
    }} />

      <div style={{
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      maxWidth: '820px',
      padding: '0 24px'
    }}>
        {/* Badge */}
        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(79,70,229,0.15)',
        border: '1px solid rgba(79,70,229,0.3)',
        borderRadius: '999px',
        padding: '5px 14px',
        marginBottom: '32px'
      }}>
          <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#4F46E5',
          display: 'block'
        }} />
          <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          fontWeight: 500,
          color: '#818CF8',
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }}>
            For developers, by developers
          </span>
        </div>

        <h1 style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(36px, 6vw, 72px)',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        color: '#ffffff',
        marginBottom: '24px'
      }}>
          Read. Write.{' '}
          <span style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 50%, #22D3EE 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
            Share your
          </span>
          <br />
          code stories.
        </h1>

        <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(16px, 2vw, 20px)',
        fontWeight: 400,
        color: '#B3B3B3',
        lineHeight: 1.6,
        marginBottom: '44px',
        maxWidth: '560px',
        margin: '0 auto 44px'
      }}>
          A place for developers to write and discover technical blog posts. Build your audience, sharpen your thinking.
        </p>

        <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
          <button onClick={onSignup} style={{
          background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 32px',
          color: '#ffffff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 0 24px rgba(79,70,229,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s'
        }} onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 0 36px rgba(79,70,229,0.5)';
        }} onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 24px rgba(79,70,229,0.35)';
        }}>
            Get Started
          </button>
          <button onClick={onLogin} style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '8px',
          padding: '14px 32px',
          color: '#ffffff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s'
        }} onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        }} onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          e.currentTarget.style.background = 'transparent';
        }}>
            Login
          </button>
        </div>
      </div>
    </section>;
}

// ── Feature section mockups ──────────────────────────────────────────────────

function MarkdownEditorMockup() {
  const lines = [{
    type: 'h1',
    text: '# Building a REST API with Bun'
  }, {
    type: 'blank',
    text: ''
  }, {
    type: 'text',
    text: 'In this post, we\'ll build a fast REST API using'
  }, {
    type: 'text',
    text: '**Bun** — the all-in-one JavaScript runtime.'
  }, {
    type: 'blank',
    text: ''
  }, {
    type: 'h2',
    text: '## Getting Started'
  }, {
    type: 'blank',
    text: ''
  }, {
    type: 'code',
    text: '```typescript'
  }, {
    type: 'code',
    text: 'const server = Bun.serve({'
  }, {
    type: 'code',
    text: '  port: 3000,'
  }, {
    type: 'code',
    text: '  fetch(req) {'
  }, {
    type: 'code',
    text: '    return new Response("Hello!")'
  }, {
    type: 'code',
    text: '  }'
  }, {
    type: 'code',
    text: '})'
  }, {
    type: 'code',
    text: '```'
  }];
  return <div style={{
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
  }}>
      {/* Title bar */}
      <div style={{
      background: '#1A1A1A',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
        <span style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#FF5F57',
        display: 'block'
      }} />
        <span style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#FFBD2E',
        display: 'block'
      }} />
        <span style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#28CA41',
        display: 'block'
      }} />
        <span style={{
        marginLeft: '8px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: '#666'
      }}>
          new-post.md — DevBlog Editor
        </span>
      </div>
      {/* Editor content */}
      <div style={{
      padding: '20px 24px',
      minHeight: '280px'
    }}>
        {lines.map((line, i) => <div key={i} style={{
        marginBottom: '2px',
        lineHeight: '22px'
      }}>
            {line.type === 'h1' && <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '13px',
          color: '#818CF8',
          fontWeight: 700
        }}>
                {line.text}
              </span>}
            {line.type === 'h2' && <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: '#6366F1'
        }}>
                {line.text}
              </span>}
            {line.type === 'text' && <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: '#B3B3B3'
        }}>
                {line.text}
              </span>}
            {line.type === 'code' && <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: '#22D3EE'
        }}>
                {line.text}
              </span>}
            {line.type === 'blank' && <span>&nbsp;</span>}
          </div>)}
        {/* Blinking cursor */}
        <span style={{
        display: 'inline-block',
        width: '8px',
        height: '16px',
        background: '#4F46E5',
        verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite'
      }} />
      </div>
    </div>;
}
function CommentsMockup() {
  const comments = [{
    avatar: 'SK',
    name: 'Sarah Kim',
    handle: '@sarahk',
    time: '2h ago',
    text: 'Great write-up! The section on connection pooling really helped me fix a production issue.',
    color: '#4F46E5'
  }, {
    avatar: 'MR',
    name: 'Marcus Rivera',
    handle: '@mrivera',
    time: '1h ago',
    text: 'Have you benchmarked this against Drizzle ORM? I\'d love to see a follow-up.',
    color: '#22D3EE'
  }, {
    avatar: 'AJ',
    name: 'Aisha Johnson',
    handle: '@ajohnson',
    time: '30m ago',
    text: '❤️ Saved this — exactly what I needed for the side project I\'m building.',
    color: '#818CF8'
  }];
  return <div style={{
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
  }}>
      <div style={{
      background: '#1A1A1A',
      padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
        <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 600,
        color: '#ffffff'
      }}>
          Comments · 12
        </span>
        <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        color: '#666'
      }}>
          Most recent
        </span>
      </div>
      <div style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
        {comments.map((c, i) => <div key={i} style={{
        display: 'flex',
        gap: '12px'
      }}>
            <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: c.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0
        }}>
              {c.avatar}
            </div>
            <div style={{
          flex: 1
        }}>
              <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            marginBottom: '4px'
          }}>
                <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff'
            }}>
                  {c.name}
                </span>
                <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#555'
            }}>
                  {c.handle}
                </span>
                <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: '#444',
              marginLeft: 'auto'
            }}>
                  {c.time}
                </span>
              </div>
              <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#B3B3B3',
            lineHeight: 1.5,
            margin: 0
          }}>
                {c.text}
              </p>
            </div>
          </div>)}
        {/* Reply input */}
        <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        marginTop: '4px'
      }}>
          <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4F46E5, #22D3EE)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0
        }}>
            You
          </div>
          <div style={{
          flex: 1,
          background: '#1A1A1A',
          border: '1px solid rgba(79,70,229,0.35)',
          borderRadius: '6px',
          padding: '9px 14px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#555'
        }}>
            Write a comment...
          </div>
        </div>
      </div>
    </div>;
}
function PostManagementMockup() {
  const posts = [{
    title: 'Building a REST API with Bun',
    status: 'Published',
    views: '4.2k',
    reads: '1.8k',
    date: 'Aug 10'
  }, {
    title: 'TypeScript 5.5 Pattern Matching',
    status: 'Published',
    views: '2.9k',
    reads: '1.1k',
    date: 'Aug 3'
  }, {
    title: 'Deploying Bun on Fly.io',
    status: 'Draft',
    views: '—',
    reads: '—',
    date: 'Aug 12'
  }, {
    title: 'React Server Components deep dive',
    status: 'Scheduled',
    views: '—',
    reads: '—',
    date: 'Aug 15'
  }];
  const statusColor = {
    Published: '#22D3EE',
    Draft: '#888',
    Scheduled: '#818CF8'
  };
  const statusBg = {
    Published: 'rgba(34,211,238,0.1)',
    Draft: 'rgba(136,136,136,0.1)',
    Scheduled: 'rgba(129,140,248,0.1)'
  };
  return <div style={{
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
  }}>
      <div style={{
      background: '#1A1A1A',
      padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
        <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 600,
        color: '#ffffff'
      }}>
          Your Posts
        </span>
        <div style={{
        background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
        borderRadius: '5px',
        padding: '5px 12px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        color: '#fff',
        cursor: 'default'
      }}>
          + New Post
        </div>
      </div>
      {/* Table header */}
      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 90px 60px 60px 60px',
      padding: '10px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      gap: '8px'
    }}>
        {['Title', 'Status', 'Views', 'Reads', 'Date'].map(h => <span key={h} style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px',
        fontWeight: 600,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>
            {h}
          </span>)}
      </div>
      {/* Rows */}
      {posts.map((p, i) => <div key={i} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 90px 60px 60px 60px',
      padding: '12px 20px',
      borderBottom: i < posts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
      gap: '8px',
      alignItems: 'center',
      transition: 'background 0.15s'
    }} onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
    }} onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent';
    }}>
          <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        color: '#E5E5E5',
        fontWeight: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
            {p.title}
          </span>
          <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px',
        fontWeight: 600,
        color: statusColor[p.status],
        background: statusBg[p.status],
        padding: '3px 8px',
        borderRadius: '999px',
        display: 'inline-block',
        textAlign: 'center'
      }}>
            {p.status}
          </span>
          <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: '#777'
      }}>{p.views}</span>
          <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: '#777'
      }}>{p.reads}</span>
          <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: '#555'
      }}>{p.date}</span>
        </div>)}
    </div>;
}

// ── Feature section ──────────────────────────────────────────────────────────

function FeatureSection({
  tagline,
  headline,
  body,
  reverse,
  mockup
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      threshold: 0.15
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} style={{
    backgroundColor: '#0D0D0D',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    padding: 'clamp(64px, 8vw, 120px) 24px'
  }}>
      <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(40px, 6vw, 80px)',
      alignItems: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease'
    }}>
        {/* Text column */}
        <div style={{
        order: reverse ? 2 : 1
      }}>
          <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          fontWeight: 600,
          color: '#4F46E5',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
            // {tagline}
          </div>
          <h2 style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: '#ffffff',
          marginBottom: '20px'
        }}>
            {headline}
          </h2>
          <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '17px',
          lineHeight: 1.7,
          color: '#B3B3B3',
          maxWidth: '440px'
        }}>
            {body}
          </p>
        </div>
        {/* Mockup column */}
        <div style={{
        order: reverse ? 1 : 2
      }}>
          {mockup}
        </div>
      </div>
    </section>;
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer({
  onBack
}) {
  return <footer style={{
    backgroundColor: '#0A0A0A',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '48px 24px'
  }}>
      <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '24px'
    }}>
        <button onClick={onBack} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '16px',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '-0.02em',
        padding: 0
      }}>
          {'<'}
          <span style={{
          color: '#4F46E5'
        }}>DevBlog</span>
          {' />'}
        </button>

        <nav style={{
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap'
      }}>
          {['About', 'GitHub', 'Contact'].map(link => <a key={link} href="#" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#777',
          textDecoration: 'none',
          transition: 'color 0.2s'
        }} onMouseEnter={e => {
          e.currentTarget.style.color = '#ffffff';
        }} onMouseLeave={e => {
          e.currentTarget.style.color = '#777';
        }}>
              {link}
            </a>)}
        </nav>

        <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        color: '#444'
      }}>
          © 2026 DevBlog. All rights reserved.
        </span>
      </div>
    </footer>;
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const onLogin = () => navigate('/login');
  const onSignup = () => navigate('/signup');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return <div style={{
    backgroundColor: '#0D0D0D',
    minHeight: '100vh'
  }}>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      <Navbar scrolled={scrolled} onLogin={onLogin} onSignup={onSignup} />

      <HeroSection onLogin={onLogin} onSignup={onSignup} />

      <FeatureSection tagline="01 — write" headline="Write in Markdown" body="A focused, distraction-free editor built for developers. Write in Markdown with full syntax highlighting, code blocks, and live preview. Your posts look great from the first draft." mockup={<MarkdownEditorMockup />} />

      <FeatureSection tagline="02 — connect" headline="Connect with other developers" body="Your writing reaches a community that gets it. Discussions stay technical and respectful. Build relationships with developers who share your stack, your curiosity, and your craft." reverse mockup={<CommentsMockup />} />

      <FeatureSection tagline="03 — own it" headline="Your content, your platform" body="Publish on your schedule. Drafts, scheduled posts, analytics — everything in one clean dashboard. Your audience, your analytics, your brand. No algorithm deciding your reach." mockup={<PostManagementMockup />} />

      <Footer onBack={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })} />
    </div>;
}

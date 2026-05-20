import { useEffect } from 'react'

/**
 * SchemaJsonLd — injeta um bloco <script type="application/ld+json">
 * no <head> usando um `id` estável, sem duplicar entre re-renders.
 *
 * Uso: <SchemaJsonLd id="faq-home" schema={{ ... }} />
 */
export function SchemaJsonLd({ id, schema }: { id: string; schema: object }) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
    return () => {
      const existing = document.getElementById(id)
      if (existing) existing.remove()
    }
  }, [id, schema])

  return null
}

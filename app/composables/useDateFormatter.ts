export function useDateFormatter() {
  const formatDate = (dateString: string, withTime = true): string => {
    if (!dateString) return ''

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''

    const options: Intl.DateTimeFormatOptions = withTime
      ? {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      : { day: '2-digit', month: '2-digit', year: 'numeric' }

    return date.toLocaleString('es-AR', options)
  }

  const formatOnlyTime = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatOnlyDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const toISO = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  const parseDMY = (dateStr: string) => {
    const [d, m, y] = dateStr.split('/').map(Number)
    if (!d || !m || !y) return null
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  }

  const formatToDayMonth = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
    })
  }

  return {
    formatDate,
    formatOnlyTime,
    formatOnlyDate,
    toISO,
    parseDMY,
    formatToDayMonth,
  }
}

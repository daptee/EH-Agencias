import type { DocumentsTypes } from '~/types/Documents'

export const getDocumentsTypes = async (): Promise<DocumentsTypes[]> => {
  try {
    const config = useRuntimeConfig()
    const response: DocumentsTypes[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/TiposDocumentos`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener tipos de documentos'
  }
}

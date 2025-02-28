/**
 * Convert a form data object to XML.
 * @param {FormData} formData Data to serialize.
 * @returns {string} Serialized form data.
 */
export const serializeFormData = (
  formData,
) => {
  const xml = document.createElement('xml')

  formData.forEach((value, key) => {
    const element = document.createElement(key)
    element.textContent = value
    xml.appendChild(element)
  })

  const serializer = new XMLSerializer()
  return serializer.serializeToString(xml)
}

export default {
  serializeFormData,
}

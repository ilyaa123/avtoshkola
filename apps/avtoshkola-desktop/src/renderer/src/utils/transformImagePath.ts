const transformImagePath = (image: string) => {
  if (import.meta.env.BASE_URL !== '/') {
    return `${import.meta.env.BASE_URL}/${image}`
  } else {
    return image
  }
}

export default transformImagePath

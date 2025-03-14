const transformImagePath = (image: string) => {
  if (import.meta.env.BASE_URL !== '/') {
    console.log(
      '🚀 ~ transformImagePath ~ import.meta.env.BASE_URL:',
      import.meta.env.BASE_URL,
      image
    )
    return `${import.meta.env.BASE_URL}/${image}`
  } else {
    return image
  }
}

export default transformImagePath

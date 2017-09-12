const formatDate = (date)=> {
  const _date = new Date(date),
    day = _date.getDate(),
    month = _date.getMonth(),
    year = _date.getFullYear() % 100

  return `${month}/${day}/${year}`
}

export default formatDate
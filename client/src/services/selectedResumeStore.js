const KEY = 'selected_resume_map'
function read(){ try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }
function write(obj){ localStorage.setItem(KEY, JSON.stringify(obj)) }

export function getSelected(savedJobId){
  const map = read()
  return map[String(savedJobId)] ?? null
}
export function setSelected(savedJobId, resumeId){
  const map = read()
  map[String(savedJobId)] = resumeId
  write(map)
}
export function clearSelected(savedJobId){
  const map = read()
  delete map[String(savedJobId)]
  write(map)
}

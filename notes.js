const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)
    
  if(!duplicateNote){
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  }else{
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = (title) =>{
  const notes = loadNotes()
  const toBeSaved = notes.filter((note)=> note.title !== title) 
  
  //같지 않은것만 뽑아내서 save하자나
  // > 로 하고 순서를 바꿔
  if(notes.length === toBeSaved.length){
    console.log(chalk.red.inverse('there is no such a file'))
  }else{
    saveNotes(toBeSaved)
    console.log(chalk.green.inverse('file has removed'))
  }
}

const listNotes = () =>{
  const notes = loadNotes()

  console.log(chalk.yellow.inverse('Your notes'))
  notes.forEach((note) => {
    console.log(note.title)
  });
}

const readNote = (title) => {
  const notes = loadNotes()
  const foundNote = notes.find(note => note.title === title)
  
  if(foundNote){
    console.log(chalk.inverse.green('제목: ' + foundNote.title))
    console.log('내용:' + foundNote.body)
  }else{
    console.log(chalk.red('No note found!'))
  }
}


const saveNotes = (notes) =>{
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJSON)
}


const loadNotes = () =>{
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()  //232324 상태
    return JSON.parse(dataJSON)
  }catch(e){
    return []
  }
}


module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes : listNotes,
  readNote:readNote
}
import { initializeApp } from "firebase/app"
import { child, get, getDatabase, ref, set } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export const dbRef = ref(db)

export const getPlayer = async (playerId: string) => {
  const ref = await get(child(dbRef, playerId))

  const player = ref.val() as Player

  return player
}

export const savePlayer = async (playerId: string, player: Player) => {
  await set(ref(db, playerId), player).catch((error) => error)
}

export const getCharacter = async (playerId: string) => {
  const ref = await get(child(dbRef, `${playerId}/character`))

  const character = ref.val() as Character

  return character
}

export const saveCharacter = async (playerId: string, character: Character) => {
  await set(ref(db, `${playerId}/character`), character).catch((error) => error)
}

export default db

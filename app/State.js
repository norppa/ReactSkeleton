import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState } = createGlobalState({
    isWide: false,
    songs: [],
    search: '',
    admin: false,
})

export { setGlobalState, useGlobalState }
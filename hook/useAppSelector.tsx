import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '@/redux/store' // Ensure the correct path

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

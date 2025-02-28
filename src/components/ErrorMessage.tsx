
import { ReactNode } from 'react';
type ErrorMessageProps = {
    children: ReactNode
}
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <span className="text-red-600 text-sm font-bold text-center bg-red-50 p-3 uppercase">
      {children}
    </span>
  )
}

export default ErrorMessage
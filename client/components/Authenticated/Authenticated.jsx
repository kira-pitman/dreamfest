import React, { useState, useEffect } from 'react'

import { getIsAuthenticated } from '../../auth-utils'

export function IfAuthenticated ({ children }) {
  const isAuthenticated = getIsAuthenticated(useAuth0)
  return isAuthenticated
    ? <>{children}</>
    : null
}

export function IfNotAuthenticated ({ children }) {
  const isAuthenticated = getIsAuthenticated(useAuth0)
  return !isAuthenticated
    ? <>{children}</>
    : null
}

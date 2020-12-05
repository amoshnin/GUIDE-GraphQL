// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const authenticated = (next) => (root, args, ctx, info) => {
  if (!ctx.user) {
    throw new Error("Not authorized")
  }

  return next(root, args, ctx, info)
}

const authorized = (role, next) => (root, args, ctx, info) => {
  if (ctx.user.role !== role) {
    throw new Error("Role is invalid")
  }

  return next(root, args, ctx, info)
}

module.exports = {
  authenticated,
  authorized,
}

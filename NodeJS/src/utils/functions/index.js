const FNSFormat = require("date-fns/format")

const formatDate = (stamp, format) => FNSFormat(stamp, format)
module.exports = { formatDate }

import { MODULE_TYPE } from "./moduleType"
const base = '/assets/scripts/'
const end = '.js'

const CALL_SCRIPT = base + MODULE_TYPE.call + end;
const FULL_SCRIPT = base + MODULE_TYPE.full + end
const SHORT_SCRIPT = base + MODULE_TYPE.short + end

export default { CALL_SCRIPT, FULL_SCRIPT, SHORT_SCRIPT}
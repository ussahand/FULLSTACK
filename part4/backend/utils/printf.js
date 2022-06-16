const styles = [
  ['reset', 0, 'color:inherit;'], // Reset the current style.
  ['bold', 1, 'font-weight: bolder;'], // Make the text bold.
  ['dim', 2, 'filter: opacity(50%);'], // Make the text have lower opacity.
  ['italic', 3, 'font-style: italic;'], // Make the text italic. (Not widely supported)
  ['underline', 4, 'text-decoration-line: underline;'], // Put a horizontal line below the text. (Not widely supported)
  ['blink', 5, 'text-decoration-line: blink;;'], // Put a horizontal line above the text. (Not widely supported)
  ['invert', 7, 'all:revert;'], // Invert background and foreground colors.
  ['hide', 8, 'visibility: hidden;'], // Print the text but make it invisible.
  ['strike', 9, 'text-decoration-line:line-through;'], // Crossed-out
  // Bold colors
  ['black', 30, 'color:black;'],
  ['red', 31, 'color:red;'],
  ['green', 32, 'color:green;'],
  ['yellow', 33, 'color:yellow;'],
  ['blue', 34, 'color:blue;'],
  ['magenta', 35, 'color:magenta;'],
  ['cyan', 36, 'color:cyan;'],
  ['white', 37, 'color:white;'],
  // bright colors
  ['grey', 90, 'color:grey;'],
  ['bblack', 90, 'color:bblack;'],
  ['bred', 91, 'color:bred;'],
  ['bgreen', 92, 'color:bgreen;'],
  ['byellow', 93, 'color:byellow;'],
  ['bblue', 94, 'color:bblue;'],
  ['bmagenta', 95, 'color:bmagenta;'],
  ['bcyan', 96, 'color:bcyan;'],
  ['bwhite', 97, 'color:bwhite;'],
  // Background clolurs
  ['bgblack', 40, 'background-color:black;'],
  ['bgred', 41, 'background-color:red;'],
  ['bggreen', 42, 'background-color:green;'],
  ['bgyellow', 43, 'background-color:yellow;'],
  ['bgblue', 44, 'background-color:blue;'],
  ['bgmagenta', 45, 'background-color:magenta;'],
  ['bgcyan', 34, 'background-color:cyan;'],
  ['bgwhite', 47, 'background-color:white;'],
  // Bright background colors
  ['bggrey', 100, 'background-color:grey;'],
  ['bgbblack', 100, 'background-color:bblack;'],
  ['bgbred', 101, 'background-color:bred;'],
  ['bgbgreen', 102, 'background-color:bgreen;'],
  ['bgbyellow', 103, 'background-color:byellow;'],
  ['bgbblue', 104, 'background-color:bblue;'],
  ['bgbmagenta', 105, 'background-color:bmagenta;'],
  ['bgbcyan', 106, 'background-color:bcyan;'],
  ['bgbwhite', 107, 'background-color:bwhite;'],
]

const ESC = '\x1b['
const RESET = '\x1b[0m'
const BROWSER_RESET = 'all:revert'
let stack = []
let output
let newColorParams

const lexical = (match, indx, str) => {
  if (indx >= str.length) {
    return
  }
  const patern = match + str[indx]
  let findex
  let allColors
  let newMatch
  let newIndx = indx + 1
  let newOutput
  switch (patern) {
    case '##':
      [newMatch, newIndx, newOutput] = ['', indx + 1, `${output}##`]
      break
    case '#': // null + # means: previous char is not match
      findex = styles.findIndex(style => style[0] === str
        .slice(newIndx, indx + style[0].length + 1))
      if (findex > -1) {
        stack.push(styles[findex])
        newMatch = ''
        newIndx = indx + 1 + styles[findex][0].length
        newIndx += str[newIndx] === ';' ? 1 : 0

        // console.log('in# ', output )
        if (typeof navigator === 'object' && navigator?.userAgent) { // in the browser or node
          newOutput = `${output}%c`
          newColorParams.push(stack.reduce((colors, color) => colors + color[2], ''))
        } else {
          newOutput = `${output + ESC + styles[findex][1]}m`
        }
        // if (typeof process === 'object' && process?.release?.name === 'node')
      } else { //  # without any specific color such as red, dim, bgblue, ...
        [newMatch, newIndx, newOutput] = ['#', indx + 1, output]
      }
      break
    case '#>': // 1st stack.pop, 2nd RESET, 3rd apply all colours
      stack.pop()
      allColors = stack.length
        ? stack.reduce((colors, color) => `${colors + ESC + color[1]}m`, RESET)
        : RESET
      if (typeof navigator === 'object' && navigator?.userAgent) { // in the browser or node
        allColors = '%c'
        const newColorparam = stack.length
          ? stack.reduce((colors, color) => colors + color[2], BROWSER_RESET)
          : BROWSER_RESET
        newColorParams.push(newColorparam)
      }
      [newMatch, newIndx, newOutput] = ['', indx + 1, output + allColors]
      break
    default:
      [newMatch, newIndx, newOutput] = ['', indx + 1, output + patern]
  }
  output = newOutput
  lexical(newMatch, newIndx, str)
}

const colorParser = printftedText => {
  output = ''
  stack = []
  newColorParams = []
  // console.log('colorParser: ', printftedText)
  lexical('', 0, printftedText)
  if (typeof process === 'object' && process?.release?.name === 'node') {
    output += RESET // reset all colors to default
  }
  return [output, ...newColorParams]
}

// module.exports = { colorParser }

// const { colorParser } = require("./colorParser")
// import { colorParser } from './colorParser'
/*
  find c languate printf %d like specifier:  e.g. for %-5.2f
  1st: find even number of % that followed by k:
    /(?<=^|[^%](?:%%)*)k/
    detail:
      it will find 'k' and then lookback for finding '%%' that
      preceded by ^ begin of string or a not % char
  2nd: find the the matched string
    /%(\+|-)?(\d*)(\.\d+)?(i|d|f|s)/
  3rd: replace k with % that will find odd frequency of %
    /(?<=^|[^%](?:%%)*)%(\+|-)?(\d*)(\.\d+)?(i|d|f|s)/g
  4th: name the captured groups:
    e.g. (?<align>\+|-)?(?<width>\d*) ...
  the capture groups are :
    (\+|-) :-
    (\d*) :5
    (\.\d+) :.2
    (i|d|f|s) :f
  note:
  +|-  it is not a group and will not capture the result for future
  (+|-) it is a group and will capture for future
  (?:+|-) it is a group but not capture
  (?<align>+|-) it is a group and will capture by align name and
    you can access it by result.groups.align
*/

const printf = (...params) => {
  const inject = (first, specifierLen, str, align, width) => {
    params.splice(1, 1) // remove the second item in parameters
    const padLen = width > str.length ? width - str.length : 0
    const half = parseInt(padLen / 2, 10)
    const padHalf = ' '.repeat(half)
    const padNexthalf = ' '.repeat(padLen - half)
    const padding = padHalf + padNexthalf

    const alignedStr = align === '+'
      ? padding + str // right
      : align === '-'
        ? str + padding // left
        : padHalf + str + padNexthalf // middle

    // replace specifier in params[0] with printfted and aligned vaule
    const beforeSpecifier = params[0].slice(0, first)
    const afterSpecifier = params[0].slice(first + specifierLen)
    params.splice(0, 1, beforeSpecifier + alignedStr + afterSpecifier)
  }

  const printfDecimal = (numberParam, matchPrecision) => {
    const number = parseInt(numberParam, 10)
    const precision = matchPrecision ? parseInt(matchPrecision, 10) : 0
    const numLen = Math.abs(number).toString().length
    const zeroPadding = precision > numLen ? '0'.repeat(precision - numLen) : ''
    const sign = number < 0 ? '-' : '' // set only minus sign
    return sign + zeroPadding + Math.abs(number)
  }

  const printfFloat = (numberParam, matchPrecision) => {
    const number = Number(numberParam)
    const precision = matchPrecision ? parseInt(matchPrecision, 10) : -1

    return precision > -1
      ? number.toFixed(precision)
      : number
  }

  const applySpecifier = (firstOccurenceIndex, matchedLen, groups) => {
    // if next param is not a number, so treat it as a string
    const specifier = Number.isNaN(params[1]) ? 's' : groups.specifier
    let printfted

    switch (specifier) {
      case 'i':
      case 'd':
        printfted = printfDecimal(params[1], groups.precision)
        break
      case 'f':
        printfted = printfFloat(params[1], groups.precision)
        break
      case 's':
        printfted = params[1].toString()
        break
      default:
        printfted = 'There is unpredictable specifier'
    }

    inject(
      firstOccurenceIndex,
      matchedLen,
      printfted,
      groups.align,
      parseInt(groups.width, 10),
    )
  }

  const parser = () => {
    const pattern = /(?<=^|[^%](?:%%)*)%(?<align>\+|-)?(?<width>\d*)(?:\.(?<precision>\d+))?(?<specifier>i|d|f|s)/g
    let match
    // eslint-disable-next-line no-cond-assign
    while (params.length > 1 && (match = pattern.exec(params[0]))) {
      applySpecifier(match.index, match[0].length, match.groups)
      pattern.lastIndex -= match[0].length
    }

    if (params.length > 1) {
      const mergedFirstTwo = [params[0], stringify(params[1])].join(' ')
      params.splice(0, 2, mergedFirstTwo)
      pattern.lastIndex = params[0].length
      parser()
    }
  }

  if (params.length) { // don't run for empty parameter
    params[0] = stringify(params[0])
    parser()
    const styledText = colorParser(params[0])
    console.log(...styledText)
  }
}

function stringify(param) {
  let coded = ''

  // note: typeof(null) === typeof(Object) === 'object'
  const propValType = param === null ? 'null' : typeof param

  switch(propValType) {
    case 'string': 
    coded = param
    break
    case 'number': 
    case 'boolean':
      coded = param.toString()
      break
    case 'undefined': 
      coded = 'undefined'
      break
    case 'null':
      coded = 'null'
      break
    case 'object': 
      coded = objectToStr(param)
      break
    default:
      coded = JSON.stringify(param)
  } 
  return coded
}

function objectToStr(obj) {
  const keys = Object.getOwnPropertyNames(obj)

  let strObj = '#red;{\n'
  let propColor
  for (const x of keys) {
    strObj += `#white${x}: `
    const propValType = obj[x] === null ? 'null' : typeof obj[x]
    switch (propValType) {
      case 'string':
        propColor = obj[x][0] == '[' || obj[x][0] == '{' // like to array or object
          ? '#green' : '#grey'
        strObj += `${propColor}${obj[x]}\n`
        break
      case 'number':
        propColor = '#yellow'
        strObj += `${propColor}${obj[x]}\n`
        break
      case 'undefined':
        propColor = '#blue'
        strObj += `${propColor}undefined\n`
        break
      case 'null':
        propColor = '#blue'
        strObj += `${propColor}null\n`
        break
      case 'object':
        propColor = '#green'
        strObj += `${propColor}${JSON.stringify(obj[x])}\n`
        break
      default:
        propColor = '#cyan'
        strObj += `${propColor}${obj[x]}\n`
    }
  }
  strObj += '#red;}'
  return strObj
}

// const prms = [959, 'Hi', 'I #red%-10.3iand %+8.3f=%s',
//   -10.5, 5,
//   '#yellow;child: %d+%d=%-8s',
//   5, 'd', 56]

// printf(...prms)
// printf('#bgbluehhhhhhhhMMMMMMMM#magenta;magenta#underline;underline#>#>#>#strike;#strike;strike')
// printf('newstr#bgred;bgred#hide;hidden#>#italic;Italic#>noItalik#revert;revert#bold;bold')
// printf('#blink;blink#strike;IIII')
// printf('by #strike;monochrome#> #yellow;hello #bold#redto#> %s #blueworld', '#bgred;colorful#>')
// printf('%d+%f=%.1f',12,13,25.87)

// if (typeof process === 'object' && process?.release?.name === 'node')
//   console.log('code is running in server', process?.release?.name)

// if (typeof navigator === 'object' && navigator.userAgent)
//   console.log('code is running in browser', navigator.userAgent)

module.exports = { printf }
// export default { printf }

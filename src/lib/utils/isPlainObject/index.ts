/*!
 * Check if an item is a plain object or not
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object}  obj  The item to check
 * @return {Boolean}      Returns true if the item is a plain object
 */
export const isPlainObject = (obj) => {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

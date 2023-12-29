
export const serializeDate = ( date : string ) => {
  const dateTime = new Date( date )
  const dateString = dateTime.toLocaleDateString( 'es-AR' )
  const timeString = dateTime.toLocaleTimeString( 'es-AR' )
  return `${ dateString } ${ timeString }`
}

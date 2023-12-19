import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
  Checkbox
} from '@nextui-org/react'

import { Key, useCallback } from 'react'
import { DeleteIcon, EditIcon, EyeIcon } from '../../..'

const statusColorMap: Record<string, ChipProps['color']>  = {
  active:   'success',
  paused:   'danger',
  vacation: 'warning',
}

interface IColumn {
  uid:  string
  name: string
}

interface IData {
  [ key : string ]: any
}

interface ICrudTableProps {
  columns:         IColumn[]
  data:            IData[]
  onViewClick?:    ( id : string ) => void
  onEditClick?:    ( id : string ) => void
  onDeleteClick?:  ( id : string ) => void
  showViewButton?: boolean
}

const serializeDate = ( date: string ) => {
  const dateTime = new Date( date )
  const dateString = dateTime.toLocaleDateString( 'es-AR' )
  const timeString = dateTime.toLocaleTimeString( 'es-AR' )
  return `${ dateString } ${ timeString }`
}

export const SimpleCrudTable = ( { columns, data, onEditClick, onViewClick, onDeleteClick, showViewButton = true } : ICrudTableProps ) => {
  type TData = typeof data[ 0 ]
  const renderCell = useCallback( ( data : TData, columnKey : Key ) => {
    const cellValue = data[ columnKey as keyof TData ]

    switch ( columnKey ) {
      case 'status':
        return (
          <Chip className="capitalize" color={ statusColorMap[ ( data.status ) ? 'active' : 'paused' ] } size="sm" variant="flat">
            { ( cellValue ) ? 'Activo' : 'Inactivo' }
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            {
              ( showViewButton ) && (
                <Tooltip content="Ver detalles">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={ () => onViewClick && onViewClick( data.id ) }
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
              )
            }
            <Tooltip content="Editar">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={ () => onEditClick && onEditClick( data.id ) }
              >
                <EditIcon />
              </span>
            </Tooltip>
            {
              ( data.status ) ? (
                <Tooltip color="danger" content="Desactivar">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={ () => onDeleteClick && onDeleteClick( data.id ) }
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip color={ statusColorMap[ data.status ? 'active' : 'paused' ] } content="Activar">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" >
                    <Checkbox color="success"
                        onChange={ () => onDeleteClick && onDeleteClick( data.id ) }
                      ></Checkbox>
                  </span>
                </Tooltip>
              )
            }
          </div>
        )
      case 'createdAt':
        return serializeDate( cellValue )
      case 'updatedAt':
        return serializeDate( cellValue )
      default:
        return cellValue
    }
  }, [] )

  return (
  <Table aria-label="Tabla de datos">
      <TableHeader columns={ columns }>
        { ( column ) => (
          <TableColumn key={ column.uid } align={ column.uid === "actions" ? "center" : "start" } className="px-8 py-4">
            { column.name }
          </TableColumn>
        ) }
      </TableHeader>
      <TableBody items={ data }>
        { ( item ) => (
          <TableRow key={ item.id } className="p-8">
            { ( columnKey ) => <TableCell className="px-8 py-8">{ renderCell( item, columnKey ) }</TableCell> }
          </TableRow>
        ) }
      </TableBody>
    </Table>
  )
}

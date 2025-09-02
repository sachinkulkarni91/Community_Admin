import { DataGrid} from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import EditButtons from '../AdminPage/components/EditButtons';
import {useEffect, useRef, useState } from "react"
import EditCommunity from "./EditCommunity";
import InviteUser from './InviteUser';
import { Link } from 'react-router-dom';



type Props = {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
}

const paginationModel = { page: 0, pageSize: 8};

const CommunityDataGrid = ({ rows, setRows }: Props) => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const editCommunityRef = useRef<HTMLDivElement | null>(null);
  const [editCommunityDisplay, setEditCommunityDisplay] = useState(false);

  const inviteUserRef = useRef<HTMLDivElement | null>(null);
  const [inviteUserDisplay, setInviteUserDisplay] = useState(false);

  const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1.5, 
    renderCell: (params) => (
      <div className='flex items-center'>
        <img src={params.value.src} alt={params.value.name} className='w-6 h-6 rounded-full mr-2' />
        <Link to={`/community/${encodeURIComponent(params.value.name)}`}><span className='hover:underline'>{params.value.name}</span></Link>
      </div>
    )
  },
  { field: 'description', headerName: 'Description', flex: 2 },
  { field: 'members', headerName: 'Members', flex: 1 },
  {
    field: 'subCommunities',
    headerName: 'Sub Communities',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params) => (
      <div className='flex w-full h-full items-center' onClick={() => {
        setId(params.row.id);
        setName(params.row.name.name);
        setDescription(params.row.description);
      }}>
        <EditButtons setInviteUserDisplay={setInviteUserDisplay} setEditCommunityDisplay={setEditCommunityDisplay}  setRows={setRows} id={params.row.id} />
      </div>
    ),
    flex: 1.5,
    
  }
];


  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (editCommunityRef.current && !editCommunityRef.current.contains(event.target as Node)) {
          setEditCommunityDisplay(false)
        }
      }

      if (editCommunityDisplay) {
        document.addEventListener('mousedown', handleClickOutside)
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }

    }, [editCommunityDisplay])

  return (
    <div className='w-full h-full'>
      <div className='h-[calc(100%-64px)]'>
        {editCommunityDisplay && <EditCommunity id={id} oldName={name} oldDescription={description} ref={editCommunityRef} setVisible={setEditCommunityDisplay}></EditCommunity>}
        {inviteUserDisplay && <InviteUser ref={inviteUserRef} setVisible={setInviteUserDisplay} id={id}></InviteUser>}
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[4, 8]}
          sx={{ border: 0, fontSize: 11 }}
          disableRowSelectionOnClick
          disableColumnResize
        />
      </div>
    </div>
  )
}

export default CommunityDataGrid
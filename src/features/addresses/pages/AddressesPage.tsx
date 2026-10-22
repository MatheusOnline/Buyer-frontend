import {useState} from 'react';
import {FiCheck,FiEdit2,FiHome,FiMapPin,FiPlus,FiRefreshCw,FiTrash2} from 'react-icons/fi';
import {Skeleton} from '../../../Components/UI/Skeleton/Skeleton';
import {Button,Feedback} from '../../profile/components/profile.styles';
import {useAddresses,useAddressActions} from '../hooks/useAddresses';
import {addressError,formatCep} from '../utils/addressForm';
import type {AddressValues,SavedAddress} from '../types';
import {Badge,Card,Danger,Empty,Grid,Header,Hint,SmallButton} from '../components/addresses.styles';
import {AddressEditor} from '../components/AddressEditor';
import {RemoveAddress} from '../components/RemoveAddress';
export default function AddressesPage() {
    const query=useAddresses();const actions=useAddressActions();
    const addresses=query.data?.data??[];
    const [editor,setEditor]=useState<{address?:SavedAddress}|null>(null);
    const [removing,setRemoving]=useState<SavedAddress|null>(null);
    const [error,setError]=useState('');const [success,setSuccess]=useState('');
    function reset(){setError('');setSuccess('');}
    async function save(values:AddressValues) {try{if(editor?.address)await actions.update.mutateAsync({id:editor.address.id,values});else await actions.create.mutateAsync(values);setEditor(null);setError('');setSuccess('Endereço salvo com sucesso.');}catch(failure){setError(addressError(failure));}}
    async function remove(){if(!removing)return;try{await actions.remove.mutateAsync(removing.id);setRemoving(null);setError('');setSuccess('Endereço removido da sua lista.');}catch(failure){setError(addressError(failure));}}
    async function primary(id:string){reset();try{await actions.setDefault.mutateAsync(id);setSuccess('Endereço principal atualizado.');}catch(failure){setError(addressError(failure));}}
    return <><Header><div><h2>Meus endereços</h2><p>Organize seus endereços e facilite as próximas entregas.</p></div><Button type="button" $primary disabled={query.isLoading||!query.data||actions.busy||addresses.length>=3} onClick={()=>{reset();setEditor({});}}><FiPlus/>Novo endereço</Button></Header>
        <Hint><span><strong>{addresses.length} de 3</strong> endereços cadastrados</span><span>O principal será sugerido nas próximas compras.</span></Hint>
        {success&&<Feedback role="status"><FiCheck/> {success}</Feedback>}{error&&!editor&&!removing&&<Feedback role="alert" $error>{error}</Feedback>}
        {query.isLoading?<Grid aria-busy="true" aria-label="Carregando endereços"><Skeleton height="280px"/><Skeleton height="280px"/></Grid>:!query.data?<Empty role="alert"><FiMapPin/><h3>Não foi possível carregar os endereços</h3><p>Confira sua conexão e tente novamente.</p><Button disabled={query.isFetching} onClick={()=>query.refetch()}><FiRefreshCw/>Tentar novamente</Button></Empty>:<>
            {query.isError&&<Feedback role="alert" $error>Não foi possível atualizar a lista. Confira sua conexão antes de fazer novas alterações.</Feedback>}
            {!addresses.length?<Empty><FiMapPin/><h3>Onde vamos entregar suas descobertas?</h3><p>Cadastre seu primeiro endereço para agilizar as próximas compras.</p><Button type="button" $primary onClick={()=>{reset();setEditor({});}}><FiPlus/>Cadastrar endereço</Button></Empty>:<Grid>{addresses.map(address=><Card key={address.id} $primary={address.is_default}><header><div><FiHome/><h3>{address.label}</h3></div>{address.is_default&&<Badge><FiCheck/>Principal</Badge>}</header><address><strong>{address.street}, {address.number}</strong><span>{address.district} · {address.city}</span><span>CEP {formatCep(address.postal_code)}</span>{address.complement&&<span>{address.complement}</span>}{address.reference&&<span>Referência: {address.reference}</span>}</address><footer>{!address.is_default&&<SmallButton type="button" onClick={()=>primary(address.id)} disabled={actions.busy}>Definir como principal</SmallButton>}<div><SmallButton type="button" disabled={actions.busy} aria-label={`Editar endereço ${address.label}`} onClick={()=>{reset();setEditor({address});}}><FiEdit2/>Editar</SmallButton><Danger type="button" disabled={actions.busy} aria-label={`Remover endereço ${address.label}`} onClick={()=>{reset();setRemoving(address);}}><FiTrash2/>Remover</Danger></div></footer></Card>)}</Grid>}
            {addresses.length>=3&&<Hint>Você atingiu o limite de três endereços. Edite ou remova um deles para cadastrar outro.</Hint>}
        </>}
        {editor&&<AddressEditor key={editor.address?.id??'new'} address={editor.address} first={addresses.length===0} busy={actions.create.isPending||actions.update.isPending} error={error} onSave={save} onClose={()=>{setEditor(null);setError('');}}/>}
        {removing&&<RemoveAddress address={removing} busy={actions.remove.isPending} error={error} onConfirm={remove} onClose={()=>{setRemoving(null);setError('');}}/>}
    </>;
}

import {useState} from 'react';
import type {FormEvent} from 'react';
import {FiCheck,FiSave,FiUser} from 'react-icons/fi';
import type {Profile,ProfileDraft,ProfileErrors} from '../types';
import {useUpdateProfile} from '../hooks/useProfile';
import {profileChanged,profileDraft,profileFailure,profilePayload,profileValidation} from '../utils/profileForm';
import {Actions,Button,Feedback,Field,Fields,Input,Panel} from './profile.styles';
export function ProfileForm({profile}:{profile:Profile}) {
    const [draft,setDraft]=useState(()=>profileDraft(profile));
    const [errors,setErrors]=useState<ProfileErrors>({});
    const [message,setMessage]=useState('');
    const [success,setSuccess]=useState(false);
    const mutation=useUpdateProfile();
    const changed=profileChanged(draft,profile);
    function change(key:keyof ProfileDraft,value:string) {setDraft(current=>({...current,[key]:value}));setErrors(current=>({...current,[key]:undefined}));setMessage('');setSuccess(false);}
    function cancel(){setDraft(profileDraft(profile));setErrors({});setMessage('');setSuccess(false);}
    async function submit(event:FormEvent) {
        event.preventDefault();if(mutation.isPending||!changed)return;
        const invalid=profileValidation(draft);setErrors(invalid);setMessage('');setSuccess(false);
        if(Object.keys(invalid).length)return;
        try{const response=await mutation.mutateAsync(profilePayload(draft));setDraft(profileDraft({...profile,...response.data}));setSuccess(true);}
        catch(error){setMessage(profileFailure(error));}
    }
    return <Panel aria-labelledby="profile-data-title"><h2 id="profile-data-title"><FiUser/>Dados pessoais</h2><p>Mantenha suas informações atualizadas para facilitar suas próximas compras.</p>
        <form onSubmit={submit} noValidate aria-busy={mutation.isPending}>
            <Fields><Field><label htmlFor="profile-firstname">Nome</label><Input id="profile-firstname" name="firstname" autoComplete="given-name" maxLength={100} value={draft.firstname} disabled={mutation.isPending} aria-invalid={!!errors.firstname} aria-describedby={errors.firstname?'profile-firstname-error':undefined} onChange={event=>change('firstname',event.target.value)}/>{errors.firstname&&<small id="profile-firstname-error" role="alert">{errors.firstname}</small>}</Field>
            <Field><label htmlFor="profile-lastname">Sobrenome</label><Input id="profile-lastname" value={profile.lastname??''} disabled/><small>Conforme informado no cadastro.</small></Field>
            <Field><label htmlFor="profile-email">E-mail</label><Input id="profile-email" name="email" type="email" autoComplete="email" maxLength={255} value={draft.email} disabled={mutation.isPending} aria-invalid={!!errors.email} aria-describedby={errors.email?'profile-email-error':'profile-email-hint'} onChange={event=>change('email',event.target.value)}/>{errors.email?<small id="profile-email-error" role="alert">{errors.email}</small>:<small id="profile-email-hint">Utilizado para entrar na conta e receber informações da compra.</small>}</Field>
            <Field><label htmlFor="profile-phone">Celular</label><Input id="profile-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(44) 99999-9999" maxLength={16} value={draft.phone} disabled={mutation.isPending} aria-invalid={!!errors.phone} aria-describedby={errors.phone?'profile-phone-error':'profile-phone-hint'} onChange={event=>change('phone',event.target.value)}/>{errors.phone?<small id="profile-phone-error" role="alert">{errors.phone}</small>:<small id="profile-phone-hint">Informe o DDD e o número do celular.</small>}</Field>
            <Field><label htmlFor="profile-cpf">CPF</label><Input id="profile-cpf" value={profile.cpf??''} disabled/><small>Documento vinculado ao seu cadastro. Não pode ser alterado aqui.</small></Field></Fields>
            {message&&<Feedback role="alert" $error>{message}</Feedback>}{success&&<Feedback role="status"><FiCheck/> Seus dados foram atualizados com sucesso.</Feedback>}
            <Actions><span>{changed?'Você tem alterações ainda não salvas.':'Altere os campos e salve quando terminar.'}</span><div><Button type="button" onClick={cancel} disabled={!changed||mutation.isPending}>Descartar alterações</Button><Button $primary type="submit" disabled={!changed||mutation.isPending}><FiSave/>{mutation.isPending?'Salvando…':'Salvar alterações'}</Button></div></Actions>
        </form>
    </Panel>;
}

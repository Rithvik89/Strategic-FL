import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { LeagueForm } from '../../components/LeagueForm';

export function CreateLeague() {
    return(
        <div className="container p-4">
            <LeagueForm/>
        </div>
    )
}
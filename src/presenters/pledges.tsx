import React from 'react';
import { getAuth } from 'firebase/auth';
import UserService from '../services/UserService';
import { Pledge } from '../types';

interface SetPledgesParameters {
    setPledges: React.Dispatch<React.SetStateAction<Pledge[] | null>>
    setPledgesLoading: React.Dispatch<React.SetStateAction<boolean>>
    isMounted: boolean
}

class PledgesPresenter {
    static async setPledges(
        { setPledges, setPledgesLoading, isMounted }: SetPledgesParameters,
    ) {
        try {
            const { currentUser } = getAuth();
            if (!currentUser) {
                throw new Error('User missing');
            }

            const { pledges } = await UserService.get(currentUser.uid);
            if (isMounted) {
                if (pledges) {
                    setPledges(pledges);
                }
                setPledgesLoading(false);
            }
        } catch (_error) {
            if (isMounted) setPledgesLoading(false);
        }
    }
}

export default PledgesPresenter;

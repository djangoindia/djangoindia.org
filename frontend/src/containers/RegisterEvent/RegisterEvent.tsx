'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Check, Clock, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@components';
import { API_ENDPOINTS, APP_ROUTES } from '@constants';
import { cn } from '@utils';

import { fetchData } from '@/utils';
import { getAccessToken } from '@/utils/getAccesstoken';

import type { Event } from '@/types';

const rsvpStatusMap = {
  rsvped: 'RSVPed',
  cancelled: 'Cancelled',
  waitlisted: 'Waitlisted',
};

export const RegisterEvent = ({
  status,
}: {
  status: Event['registration_status'];
}) => {
  const session = useSession();
  const params = useParams();
  const router = useRouter();

  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { register, setValue, handleSubmit, reset } = useForm<{
    rsvpNote: string;
  }>({
    defaultValues: {
      rsvpNote: '',
    },
  });

  useEffect(() => {
    setIsRSVPed(status !== null);
  }, [status]);

  /**
   * Fetches RSVP notes for a specific event and updates the form value.
   *
   * @remarks
   * This function retrieves an access token, makes a request to fetch RSVP notes
   * for the event specified in the `params`, and updates the form field `rsvpNote`.
   *
   * @async
   * @function getRSVPNotes
   * @returns {Promise<void>} A promise that resolves when the RSVP notes are fetched and set.
   *
   * @example
   * ```ts
   * useEffect(() => {
   *   getRSVPNotes();
   * }, [getRSVPNotes]);
   * ```
   */
  const getRSVPNotes = useCallback(async () => {
    const accessToken = await getAccessToken();
    await fetchData<{ rsvp_notes: string }[]>(
      API_ENDPOINTS.eventRSVP.replace(':slug', params['event'] as string),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then((res) => {
      setValue('rsvpNote', res.data?.[0].rsvp_notes ?? '');
    });
  }, [params, setValue]);

  useEffect(() => {
    if (isRSVPed) {
      getRSVPNotes();
    }
  }, [getRSVPNotes, isRSVPed]);

  /**
   * Handles the RSVP action for an event.
   *
   * @remarks
   * This function retrieves an access token, sends a POST request to RSVP for an event,
   * and updates the UI based on the response.
   *
   * @async
   * @function handleRSVP
   * @returns {Promise<void>} A promise that resolves when the RSVP request is processed.
   *
   * @example
   * ```ts
   * <Button onClick={handleRSVP}>RSVP</Button>
   * ```
   */
  const handleRSVPEvent = async (): Promise<void> => {
    const accessToken = await getAccessToken();
    const res = await fetchData<{ message: string }>(
      API_ENDPOINTS.eventRSVP.replace(':slug', params['event'] as string),
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status: 'rsvped',
          rsvp_notes: 'Mock Note',
        }),
      },
    );

    if (res.statusCode === 200 || res.statusCode === 201) {
      setIsRSVPed(true);
      router.refresh();
      enqueueSnackbar(res?.data?.message, { variant: 'success' });
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      });
    }
  };

  /**
   * Handles the RSVP action for an event.
   *
   * @remarks
   * This function sends a PUT request to RSVP for an event,
   * and updates the UI based on the response.
   *
   * @async
   * @function handleRSVP
   * @returns {Promise<void>} A promise that resolves when the RSVP request is processed.
   *
   * @example
   * ```ts
   * <Button onClick={handleUpdateRSVPEvent}>Update RSVP</Button>
   * ```
   */
  const handleUpdateRSVPEvent: SubmitHandler<{
    rsvpNote: string;
  }> = async ({ rsvpNote }): Promise<void> => {
    const accessToken = await getAccessToken();
    const res = await fetchData<{ message: string }>(
      API_ENDPOINTS.eventRSVP.replace(':slug', params['event'] as string),
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status,
          rsvp_notes: rsvpNote,
        }),
      },
    );

    if (res.statusCode === 200 || res.statusCode === 201) {
      setIsOpen(false);
      router.refresh();
      enqueueSnackbar(res?.data?.message, { variant: 'success' });
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      });
    }
    reset();
  };

  /**
   * Handles the RSVP action for an event.
   *
   * @remarks
   * This function sends a DELETE request to RSVP for an event,
   * and updates the UI based on the response.
   *
   * @async
   * @function handleRSVP
   * @returns {Promise<void>} A promise that resolves when the RSVP request is processed.
   *
   * @example
   * ```ts
   * <Button onClick={handleDeleteRSVPEvent}>Delete RSVP</Button>
   * ```
   */
  const handleDeleteRSVPEvent = async (): Promise<void> => {
    const accessToken = await getAccessToken();
    const res = await fetchData<{ message: string }>(
      API_ENDPOINTS.eventRSVP.replace(':slug', params['event'] as string),
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (res.statusCode === 200 || res.statusCode === 201) {
      setIsOpen(false);
      setIsRSVPed(false);
      router.refresh();
      enqueueSnackbar(res?.data?.message, { variant: 'success' });
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      });
    }
  };

  return session ? (
    <div className='flex items-center gap-4'>
      {status && (
        <div
          className={cn(
            'flex gap-3 rounded bg-white px-4 py-2 font-semibold ',
            {
              'text-green-600': status === 'rsvped',
              'text-yellow-600': status === 'waitlisted',
              'text-red-600': status === 'cancelled',
            },
          )}
        >
          {rsvpStatusMap[status]}
          {
            {
              rsvped: <Check />,
              cancelled: <X />,
              waitlisted: <Clock />,
            }[status]
          }
        </div>
      )}
      {isRSVPed ? (
        <Button
          className='z-50 w-fit bg-blue-900'
          onClick={() => setIsOpen(true)}
        >
          Edit RSVP
        </Button>
      ) : (
        <Button
          className='z-50 w-fit bg-blue-900'
          onClick={() => handleRSVPEvent()}
        >
          RSVP Now
        </Button>
      )}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className='bg-orange-50 p-16 sm:max-w-[530px]'>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl font-bold'>
              Update your RSVP
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleUpdateRSVPEvent)}
            className='flex flex-col gap-5'
          >
            <Input {...register('rsvpNote')} type='text' />
            <DialogFooter className='mx-auto'>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteRSVPEvent();
                }}
                className='bg-blue-900'
              >
                Remove RSVP
              </Button>
              <Button type='submit' className='bg-blue-900'>
                Update Note
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  ) : (
    <Button
      className='z-50 w-fit bg-blue-900'
      onClick={() => router.push(APP_ROUTES.login)}
    >
      Login to register
    </Button>
  );
};

// import { isFunction } from "lodash";
import { useCallback } from 'react';
import EditQueryVisualDialog from '@/components/EditQueryVisualDialog';

export default function useAddQueryVisualDialog(schema) {
    // const onChangeRef = useRef();
    // onChangeRef.current = isFunction(onChange) ? onChange : () => {};
  
    return useCallback(() => {
        EditQueryVisualDialog.showModal({ schema })
        .result.then(() => {})
        .catch(() => {}); // ignore dismiss
    }, [schema]);
  }
  

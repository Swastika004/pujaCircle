import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { priestServiceSchema, PriestServiceInput } from '@/schemas/priest.schema';
import { PriestService } from '@/types/priest.types';
import { catalogApi } from '@/api/catalog.api';
import { PujaCatalogEntry } from '@/types/catalog.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndianRupee, Sparkles } from 'lucide-react';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceToEdit?: PriestService | null;
  onSubmit: (data: PriestServiceInput) => Promise<void>;
  isLoading?: boolean;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  serviceToEdit,
  onSubmit,
  isLoading = false,
}) => {
  const [catalogList, setCatalogList] = useState<PujaCatalogEntry[]>([]);

  useEffect(() => {
    async function loadCatalog() {
      const items = await catalogApi.getCatalog();
      setCatalogList(items || []);
    }
    loadCatalog();
  }, []);

  const [selectedMode, setSelectedMode] = useState<'catalog' | 'custom'>('catalog');
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PriestServiceInput>({
    resolver: zodResolver(priestServiceSchema),
    defaultValues: {
      serviceName: '',
      price: 2100,
      pujaCatalogId: undefined,
      isCustom: false,
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    if (serviceToEdit) {
      if (serviceToEdit.pujaCatalogId) {
        setSelectedMode('catalog');
        setSelectedCatalogId(serviceToEdit.pujaCatalogId);
      } else {
        setSelectedMode('custom');
        setSelectedCatalogId('');
      }

      reset({
        serviceName: serviceToEdit.serviceName,
        price: serviceToEdit.price,
        pujaCatalogId: serviceToEdit.pujaCatalogId,
        isCustom: serviceToEdit.isCustom ?? !serviceToEdit.pujaCatalogId,
        category: serviceToEdit.category,
        samagriList: serviceToEdit.samagriList,
      });
    } else {
      // New service default to first catalog entry
      const firstEntry = catalogList[0];
      if (firstEntry) {
        setSelectedMode('catalog');
        setSelectedCatalogId(firstEntry.id);
        reset({
          serviceName: firstEntry.name,
          price: 2500,
          pujaCatalogId: firstEntry.id,
          isCustom: false,
          category: firstEntry.category,
          samagriList: firstEntry.samagriList,
        });
      } else {
        setSelectedMode('custom');
        setSelectedCatalogId('');
        reset({
          serviceName: '',
          price: 2100,
          pujaCatalogId: undefined,
          isCustom: true,
        });
      }
    }
  }, [serviceToEdit, reset, isOpen, catalogList]);

  const handleCatalogSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setSelectedMode('custom');
      setSelectedCatalogId('');
      setValue('pujaCatalogId', undefined);
      setValue('isCustom', true);
      setValue('serviceName', '');
    } else {
      setSelectedMode('catalog');
      setSelectedCatalogId(val);
      const entry = catalogList.find((c) => c.id === val);
      if (entry) {
        setValue('serviceName', entry.name);
        setValue('pujaCatalogId', entry.id);
        setValue('isCustom', false);
        setValue('category', entry.category);
        setValue('samagriList', entry.samagriList);
      }
    }
  };

  const handleFormSubmit = async (data: PriestServiceInput) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg">
            {serviceToEdit ? 'Edit Ceremony Service' : 'Add New Ceremony Offering'}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select a verified ritual from the Master Catalog or define a custom ceremony.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
          {/* Catalog Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Select from Master Puja Catalog</span>
            </Label>
            <select
              value={selectedMode === 'custom' ? '__custom__' : selectedCatalogId}
              onChange={handleCatalogSelect}
              className="w-full text-xs h-9 rounded-md border border-input bg-background px-3 py-1 shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <optgroup label="Master Catalog Pujas (Recommended for Discovery)">
                {catalogList.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.name} ({entry.category})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom Options">
                <option value="__custom__">+ Other / Custom Ceremony</option>
              </optgroup>
            </select>
          </div>

          {/* Service Name (Editable or prefilled) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Ceremony Name {selectedMode === 'catalog' && '(from Master Catalog)'}
            </Label>
            <Input
              placeholder="e.g. Griha Pravesh & Vastu Shanti"
              {...register('serviceName')}
              readOnly={selectedMode === 'catalog'}
              className={`text-xs ${selectedMode === 'catalog' ? 'bg-muted/50 cursor-not-allowed text-stone-700 font-medium' : ''}`}
            />
            {errors.serviceName && (
              <p className="text-[11px] text-destructive">{errors.serviceName.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Recommended Cash Dakshina (₹ INR)</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="2500"
                {...register('price')}
                className="pl-9 text-xs font-semibold"
              />
            </div>
            {errors.price && (
              <p className="text-[11px] text-destructive">{errors.price.message}</p>
            )}
            <p className="text-[10px] text-muted-foreground">
              Direct offline cash amount devotees will offer upon ceremony completion.
            </p>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isLoading} className="text-xs">
              {isLoading ? 'Saving...' : serviceToEdit ? 'Update Offering' : 'Save Offering'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Linkedin, Instagram } from 'lucide-react';

interface SocialProfilesFormProps {
  form: UseFormReturn<any>;
}

const SocialProfilesForm = ({ form }: SocialProfilesFormProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="socialProfiles.linkedin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LinkedIn Profile</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder="https://linkedin.com/in/yourprofile" 
                  className="pl-12"
                  {...field} 
                />
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="absolute inset-y-0 right-0 flex w-10 items-center justify-center">
                  {field.value && (
                    <a 
                      href={field.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="socialProfiles.instagram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram Profile</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder="https://instagram.com/yourusername" 
                  className="pl-12"
                  {...field} 
                />
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="absolute inset-y-0 right-0 flex w-10 items-center justify-center">
                  {field.value && (
                    <a 
                      href={field.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SocialProfilesForm;
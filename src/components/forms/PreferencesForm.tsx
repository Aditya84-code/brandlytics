import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface PreferencesFormProps {
  form: UseFormReturn<any>;
}

const industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'creative', label: 'Creative Arts' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const goals = [
  { id: 'increase-visibility', label: 'Increase online visibility' },
  { id: 'attract-opportunities', label: 'Attract career opportunities' },
  { id: 'build-authority', label: 'Build industry authority' },
  { id: 'get-clients', label: 'Get more clients/customers' },
  { id: 'improve-networking', label: 'Improve professional networking' },
  { id: 'career-change', label: 'Support career change' },
  { id: 'speaking-engagements', label: 'Get speaking engagements' },
  { id: 'book-deals', label: 'Secure book deals or publications' },
];

const PreferencesForm = ({ form }: PreferencesFormProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="preferences.industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Industry</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferences.goals"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Your Branding Goals</FormLabel>
              <div className="mt-1 text-sm text-muted-foreground">
                Select all that apply to your personal brand journey
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {goals.map((goal) => (
                <FormField
                  key={goal.id}
                  control={form.control}
                  name="preferences.goals"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={goal.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(goal.id)}
                            onCheckedChange={(checked) => {
                              const updatedGoals = checked
                                ? [...field.value, goal.id]
                                : field.value?.filter(
                                    (value: string) => value !== goal.id
                                  );
                              field.onChange(updatedGoals);
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            {goal.label}
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PreferencesForm;
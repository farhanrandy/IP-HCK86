
import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  summary: z.string().min(1, 'Required'),
  experiences: z.array(z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    description: z.string().min(1),
  })),
  skills: z.array(z.string().min(1)),
  education: z.array(z.object({
    school: z.string().min(1),
    degree: z.string().min(1),
    year: z.string().min(1),
  }))
})

export default function ResumeForm({ defaultValues, onSubmit, submitLabel='Save' }){
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: '',
      summary: '',
      experiences: [{ company:'', role:'', startDate:'', endDate:'', description:'' }],
      skills: [''],
      education: [{ school:'', degree:'', year:'' }]
    }
  })

  const exp = useFieldArray({ control: form.control, name: 'experiences' })
  const skills = useFieldArray({ control: form.control, name: 'skills' })
  const edu = useFieldArray({ control: form.control, name: 'education' })

  useEffect(()=>{
    if (defaultValues) form.reset(defaultValues)
  }, [defaultValues])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Name</label>
          <Input {...form.register('name')} />
          <p className="text-xs text-red-600">{form.formState.errors.name?.message}</p>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Summary</label>
          <Textarea rows={4} {...form.register('summary')} />
          <p className="text-xs text-red-600">{form.formState.errors.summary?.message}</p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Experiences</h4>
          <Button type="button" onClick={()=>exp.append({ company:'', role:'', startDate:'', endDate:'', description:'' })}>Add</Button>
        </div>
        {exp.fields.map((f, idx)=>(
          <div key={f.id} className="grid md:grid-cols-2 gap-3 border rounded-lg p-3">
            <div>
              <label className="text-sm">Company</label>
              <Input {...form.register(`experiences.${idx}.company`)} />
            </div>
            <div>
              <label className="text-sm">Role</label>
              <Input {...form.register(`experiences.${idx}.role`)} />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input type="month" {...form.register(`experiences.${idx}.startDate`)} />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input type="month" {...form.register(`experiences.${idx}.endDate`)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">Description</label>
              <Textarea rows={3} {...form.register(`experiences.${idx}.description`)} />
            </div>
            <div className="md:col-span-2 text-right">
              <button type="button" onClick={()=>exp.remove(idx)} className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Skills</h4>
          <Button type="button" onClick={()=>skills.append('')}>Add</Button>
        </div>
        {skills.fields.map((f, idx)=>(
          <div key={f.id} className="grid grid-cols-12 gap-2">
            <div className="col-span-10">
              <Input {...form.register(`skills.${idx}`)} placeholder="e.g., React" />
            </div>
            <div className="col-span-2 text-right">
              <button type="button" onClick={()=>skills.remove(idx)} className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Education</h4>
          <Button type="button" onClick={()=>edu.append({ school:'', degree:'', year:'' })}>Add</Button>
        </div>
        {edu.fields.map((f, idx)=>(
          <div key={f.id} className="grid md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="text-sm">School</label>
              <Input {...form.register(`education.${idx}.school`)} />
            </div>
            <div>
              <label className="text-sm">Degree</label>
              <Input {...form.register(`education.${idx}.degree`)} />
            </div>
            <div>
              <label className="text-sm">Year</label>
              <Input {...form.register(`education.${idx}.year`)} />
            </div>
            <div className="md:col-span-3 text-right">
              <button type="button" onClick={()=>edu.remove(idx)} className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <Button type="submit" className="bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"> 
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

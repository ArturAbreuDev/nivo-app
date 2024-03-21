import { ChevronDown } from 'lucide-react'

import nivoLogo from '../assets/nivo-icon.svg'
import { Badge } from './ui/badge'

export function Header() {
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <img src={nivoLogo} alt="nivo.video" />

          <Badge>BETA</Badge>
        </div>
      
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-sm font-medium">Artur Damaceno Abreu</span>
          <span className="text-xs text-zinc-400">arturabreu100@gmail.com</span>
        </div>
        <img
          src="https://github.com/arturabreudev.png"
          className="size-8 rounded-full"
          alt=""
        />
        <ChevronDown className="size-4 text-zinc-600" />
      </div>
    </div>
  )
}

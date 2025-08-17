import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const dummyImages = [
  "https://www.tatamotors.com/wp-content/uploads/2025/03/Tata-Motors-range-of-commercial-vehicles-low.jpg",
  "https://www.lhc.ie/custom/public/images/.item5x3/01-1.jpeg",
  "https://sekyo.in/cdn/shop/files/1_withoutSIM.jpg?v=1747895175"]

export default function SignIn2() {
  const [current, setCurrent] = useState(0)

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === dummyImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? dummyImages.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === dummyImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
  {/* Left Section with Carousel */}
  <div className="relative hidden h-full flex-col p-10 lg:flex border-r dark:border-gray-700">
    {/* Carousel */}
    <div className="relative z-20 m-auto w-full h-[600px] overflow-hidden rounded-xl border shadow-lg">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {dummyImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute left-4 top-1/2 -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  </div>

  {/* Right Section (Login Form) */}
  <AuthLayout>
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <UserAuthForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground px-8 text-center text-sm"></p>
      </CardFooter>
    </Card>
  </AuthLayout>
</div>

  )
}

"use client"

import Link from "next/link"
import { BookOpen, Github, Twitter, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Fonctionnalités", href: "#" },
      { name: "Tarifs", href: "#" },
      { name: "API", href: "#" },
      { name: "Documentation", href: "#" },
    ],
    company: [
      { name: "À propos", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carrières", href: "#" },
      { name: "Contact", href: "#" },
    ],
    resources: [
      { name: "Aide", href: "#" },
      { name: "Communauté", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Statut", href: "#" },
    ],
    legal: [
      { name: "Confidentialité", href: "#" },
      { name: "Conditions", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licences", href: "#" },
    ],
  }

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Bibliothèque</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Découvrez, organisez et explorez votre collection de livres avec une interface moderne et intuitive.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <Github className="h-5 w-5 text-gray-600" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <Twitter className="h-5 w-5 text-gray-600" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <Mail className="h-5 w-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Produit</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} Bibliothèque. Tous droits réservés.</p>
          <div className="flex items-center space-x-1 text-gray-500 text-sm mt-4 md:mt-0">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>par des développeurs passionnés</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
